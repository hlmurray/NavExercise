'use strict';

function getMenuItemsFromApi() {
	return $.ajax("/api/nav.json", {
		success: function(d) {
			// parse data and create elements
			var navigation = createNestedList(d);
			
			// append to DOM
			var primary = document.getElementsByClassName('primary')[0];
			primary.appendChild(navigation);

			// add click handlers
			addClickHandlers();
		}
	});
}

function createNestedList(d){
	var navigation = document.createDocumentFragment();
	
	for(var j=0, jsonLength=d.items.length; j<jsonLength; j++) {
		var newListItem = document.createElement("li"),
			anchor = document.createElement("a"),
			nestedItems = d.items[j].items;

		// create list items	
		anchor.href = d.items[j].url;
		anchor.innerHTML = d.items[j].label;
		newListItem.appendChild(anchor);

		// create secondary nav items
		if (nestedItems){
			if (nestedItems.length > 0){
				var ul = document.createElement('ul');
				ul.classList.add('secondary');
				var nestedList = createNestedList(d.items[j]);
				if(nestedList) {
					ul.appendChild(nestedList);
					newListItem.appendChild(ul);
					newListItem.classList.add('chevron');
				}
			}
		}	
		navigation.appendChild(newListItem);
	}
	return navigation;
}

function addClickHandlers(){
	var nestedNavs = document.querySelectorAll('.secondary');
	for(var j=0; j<nestedNavs.length; j++) {
		nestedNavs[j].parentNode.addEventListener('click', toggleNavElements);	
	}
	// click anywhere to close secondary nav
	var mask = document.querySelectorAll('.mask')[0];
	mask.addEventListener('click', function () {
		var openNavigation = document.querySelectorAll('.nestedlist');
		for(var i=0, itemsLength = openNavigation.length; i<itemsLength; i++) {
			openNavigation[i].classList.remove('nestedlist');
		}
		$('.mask').removeClass('show-mask');
		$('.site-wrapper').removeClass('show-nav');
	});
}

function toggleNavElements(e) {
	this.classList.toggle('nestedlist');
	e.stopPropagation();
	if ($('.mask').hasClass('show-mask')) {
		$('.mask').removeClass('show-mask');
	} else {
		$('.mask').addClass('show-mask');
	}
}

//functions to handle nav display in mobile view
$(function() {
	getMenuItemsFromApi();
    $('.toggle-nav').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleMobileNav();
    });
});

function toggleMobileNav() {
    if ($('.site-wrapper').hasClass('show-nav')) {
        // Do things on Nav Close
        $('.site-wrapper').removeClass('show-nav');
    } else {
        // Do things on Nav Open
        $('.site-wrapper').addClass('show-nav');
    }
}