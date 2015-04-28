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

		return;
		
		var bioLinks = document.querySelectorAll(".session .name");
		
		for (var i=0; i < bioLinks.length; i++) {
			bioLinks[i].addEventListener('click', shower.showBio, false)
		};


	},
	
	showDetails1: function(evt){
		//show the details associated with the passed element
		
		shower.hideLastShown()
		
		var grandparent = evt.target.parentElement.parentElement
		var detailElement = grandparent.querySelector(".description")
		
		if(detailElement){
			detailElement.classList.add('showing')
			shower.lastShown = detailElement
		}
		
		evt.stopPropagation()
		
		
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