//showdetails.js
//show the details of the session associated with the element

//"use strict"

var shower = {
	
	lastShown: null, //last element shown
	
	init: function(){
		//initialize all the links for bio and details
		
		
		var detailLinks = document.querySelectorAll(".summary");
		
		for (var i=0; i < detailLinks.length; i++) {
			detailLinks[i].addEventListener('click', shower.showDetails, false)
		};

		var previousButtons = document.querySelectorAll(".previous");
		
		for (var i=0; i < previousButtons.length; i++) {
			previousButtons[i].addEventListener('click', shower.showPrevious, false)
		};

		var nextButtons = document.querySelectorAll(".next");
		
		for (var i=0; i < nextButtons.length; i++) {
			nextButtons[i].addEventListener('click', shower.showNext, false)
		};
		
		var closeButtons = document.querySelectorAll(".closebox");
		
		for (var i=0; i < previousButtons.length; i++) {
			closeButtons[i].addEventListener('click', shower.hideLastShown, false)
		};
		

	},
	
	showDetails: function(evt){
		//show the details associated with the passed element
		
		shower.hideLastShown()
		
		var detailElement = this.parentElement.querySelector(".description")
		
		if(detailElement){
			detailElement.classList.add('showing')
			shower.lastShown = detailElement
		}
		
		evt.stopPropagation()
		
		
	},
	
	showPrevious: function(evt) {
	
	//show the previous details
		
	},

	showNext: function(evt) {
	
	//show the next details
		
	},

	showBio: function(evt){
		//show the bio associated with the passed element

		shower.hideLastShown()
		
		var grandparent = evt.target.parentElement.parentElement
		var bioElement = grandparent.querySelector(".bio")
		
		if(bioElement){
			bioElement.classList.add('showing')
			shower.lastShown = bioElement
		}
		
		evt.stopPropagation()
		
	},
	
	hideLastShown: function(){
		if (shower.lastShown) {
			shower.lastShown.classList.remove("showing");
			shower.lastShown = null
		}
		
	}
	
}

document.addEventListener('click',shower.hideLastShown, false)