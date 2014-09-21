 /* $.ajax({
        type: "GET",
        url: "../data/nav.json",
        dataType: "json",
        success: function (xml) {
            alert(data);
        },
    }); */

var listItems = document.getElementsByTagName('li');

for(var j=0; j<listItems.length; j++) {
	listItems[j].addEventListener('click', toggle);
}

function toggle() {
	var nested = this.querySelectorAll('.nested-list')[0];
	if(nested.classList){
		nested.classList.toggle('show');
	}
	else if(nested.style.display === 'none' || ''){
		nested.classList.add('show');
	}
}

//functions to handle nav display in mobile view

$(function() {
    $('.toggle-nav').click(function() {
        // Calling a function in case you want to expand upon this.
        toggleNav();
    });
});

function toggleNav() {
    if ($('.site-wrapper').hasClass('show-nav')) {
        // Do things on Nav Close
        $('.site-wrapper').removeClass('show-nav');
    } else {
        // Do things on Nav Open
        $('.site-wrapper').addClass('show-nav');
    }
}