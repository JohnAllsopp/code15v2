//showdetails.js
//show the details of the session associated with the element

//"use strict"

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}


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
	
	showPrevious: function(event) {
	
	//show the previous details
	
	//var currentSpeaker = evt.target.parentElement.parentElement.parentElement.parentElement
		
		
	var currentSpeakerElement = event.currentTarget.parentElement.parentElement.parentElement
	var allSpeakerElements = Array.prototype.slice.call(document.querySelectorAll('.vevent.session'));
	if (currentSpeakerElement) {
		var currentSpeakerIndex = allSpeakerElements.indexOf(currentSpeakerElement);
		
		if (currentSpeakerIndex === 0) {
			var nextSpeakerElement = allSpeakerElements[allSpeakerElements.length]
		}
		
		else if (currentSpeakerIndex !== -1 ) {
			var nextSpeakerElement = allSpeakerElements[currentSpeakerIndex - 1]
		}
	
		nextSpeakerElement.querySelector('.description').classList.add("showing")
		currentSpeakerElement = currentSpeakerElement.querySelector('.description').classList.remove("showing")
	
	}
	
	event.stopPropagation()

	},

	showNext: function(event) {
	
	//show the next details
	
	var currentSpeakerElement = event.currentTarget.parentElement.parentElement.parentElement
	var allSpeakerElements = Array.prototype.slice.call(document.querySelectorAll('.vevent.session'));
	if (currentSpeakerElement) {
		var currentSpeakerIndex = allSpeakerElements.indexOf(currentSpeakerElement);
		
		if (currentSpeakerIndex === allSpeakerElements.length) {
			var nextSpeakerElement = allSpeakerElements[0]
		}
		
		else if (currentSpeakerIndex !== -1 ) {
			var nextSpeakerElement = allSpeakerElements[currentSpeakerIndex + 1]
		}
	
		// nextSpeakerElement.querySelector(".speaker-more").classList.add("pause-transition")
		// nextSpeakerElement.querySelector(".speaker-more").classList.remove("pause-transition")

		var currentSpeakerMore = currentSpeakerElement.querySelector(".description")
		// currentSpeakerMore.classList.add("pause-transition")
		currentSpeakerMore.classList.remove("showing")
		// currentSpeakerMore.classList.remove("pause-transition")

		nextSpeakerElement.querySelector(".description").classList.add("showing")

	
	}
	
	event.stopPropagation()
	
		
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
		
	},
	
	swallowEvent: function(evt){
		evt.stopPropagation()
	}
	
}

var lightboxes = document.querySelectorAll('.lightbox')

for (var i=0; i < lightboxes.length; i++) {
	lightboxes[i].addEventListener('click', shower.swallowEvent, false)
};


var descriptions = document.querySelectorAll('.description')

for (var i=0; i < descriptions.length; i++) {
	descriptions[i].addEventListener('click', shower.hideLastShown, false)
};

