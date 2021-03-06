'use strict';

$(function() {
	getMenuItemsFromApi();
    $('.toggle-nav').click(function() {
        // on click of hamburger/close button, show/hide mobile nav
        toggleMobileNav();
    });
});

function getMenuItemsFromApi() {
	return $.ajax("/api/nav.json", {
		success: function(d) {
			// parse data and create elements
			var navigation = createNestedList(d);
			
			// append to DOM
			var p = document.createElement("p");
			p.classList.add('copyright');
			p.innerHTML = "&copy; 2014 Huge. All Rights Reserved.";
			navigation.appendChild(p);
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
	// click outside menu to close secondary nav
	var mask = document.querySelectorAll('.mask')[0],
		siteWrapper = document.querySelectorAll('.site-wrapper')[0];

	mask.addEventListener('click', function () {
		var openNavigation = document.querySelectorAll('.nestedlist');
		for(var i=0; i<openNavigation.length; i++) {
			openNavigation[i].classList.remove('nestedlist');
		}
		mask.classList.remove('show-mask');
		siteWrapper.classList.remove('show-nav');
	});
}

function toggleNavElements(e) {
	var mask = document.querySelectorAll('.mask')[0],
		chevronNavs = document.querySelectorAll('.chevron'),
		copyright = document.querySelectorAll('.copyright')[0];
	// remove secondary nav if primary is clicked again
	if(this.classList.contains('nestedlist')) {
		this.classList.remove('nestedlist');
		copyright.classList.remove('relative');
	} else {
		for(var i=0; i<chevronNavs.length; i++) {
			// remove other secondary navs on other primary click
			if(chevronNavs[i].classList.contains('nestedlist')) {
				chevronNavs[i].classList.remove('nestedlist');
			}
			// add secondary nav below clicked primary
			this.classList.add('nestedlist');
			copyright.classList.add('relative');
		}
	}
	e.stopPropagation();
	// add/remove mask for desktop
	if (mask.classList.contains('show-mask') && !this.classList.contains('nestedlist')) {
		mask.classList.remove('show-mask');
	} else {
		mask.classList.add('show-mask');
	}
}

function toggleMobileNav() {
	var siteWrapper = document.querySelectorAll('.site-wrapper')[0];
	// add/remove nav and mask for mobile
    if (siteWrapper.classList.contains('show-nav')) {
        // hide mobile nav
        siteWrapper.classList.remove('show-nav');
    } else {
        // show mobile nav
        siteWrapper.classList.add('show-nav');
    }
}