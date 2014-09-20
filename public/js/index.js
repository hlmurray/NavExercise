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
	listItems[j].addEventListener('click', Toggle);
}

function Toggle() {
	var nested = this.querySelectorAll('.nested-list')[0];
	if(nested.classList){
		nested.classList.toggle('show');
	}
	else if(nested.style.display === 'none' || ''){
		nested.classList.add('show');
	}
}