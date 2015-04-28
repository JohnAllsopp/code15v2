//This prototype is provided by the Mozilla foundation and
//is distributed under the MIT license.
//http://www.ibiblio.org/pub/Linux/LICENSES/mit.license

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

var helpers = {
	
	init: function(){
		var speakerHeroElements = document.querySelectorAll(".speaker-hero")
		for (var i=0; i < speakerHeroElements.length; i++) {
			speakerHeroElements[i].addEventListener("click", helpers.showSpeakerInfo, false)
		};

		var speakerMoreElements = document.querySelectorAll(".speaker-more")
		for (var i=0; i < speakerMoreElements.length; i++) {
			speakerMoreElements[i].addEventListener("click", helpers.stopPropagation, false)
		};


		var closeElements = document.querySelectorAll(".speaker-close")
		for (var i=0; i < closeElements.length; i++) {
			closeElements[i].addEventListener("click", helpers.hideSpeakerInfo, false)
		};

		var nextElements = document.querySelectorAll(".speaker-next")
		for (var i=0; i < nextElements.length; i++) {
			nextElements[i].addEventListener("click", helpers.nextSpeakerInfo, false)
		};
		
		var previousElements = document.querySelectorAll(".speaker-previous")
		for (var i=0; i < nextElements.length; i++) {
			previousElements[i].addEventListener("click", helpers.previousSpeakerInfo, false)
		};

		var priceButtons = document.querySelectorAll(".price-details-button")
		for (var i=0; i < priceButtons.length; i++) {
			priceButtons[i].addEventListener("click", helpers.togglePriceDetails, false)
		};

		var lightBox = document.querySelector("#lightbox")		
		lightBox.addEventListener('click', helpers.hideSpeakerInfo, false);
		
		var styleSheets = document.styleSheets
		
	},
	
	showSpeakerInfo: function(event){
		var element = event.currentTarget;
		var moreElement = element.querySelector(".speaker-more")
		
		var showingInfo = document.querySelector(".speaker-more.visible")
		
		if (showingInfo) {
			showingInfo.classList.remove("visible")
		}
		
		if (moreElement === showingInfo) {
			return
		}

		var lightBox = document.querySelector("#lightbox")
		lightBox.classList.add("visible")

		
		if (moreElement) {
			moreElement.classList.add("visible") 	
		}
	},
	
	hideSpeakerInfo: function(event){
		if(event) {
			event.stopPropagation()	
		}
		
		var visibleSpeakerElements = document.querySelectorAll(".speaker-more.visible")
		
		for (var i=0; i < visibleSpeakerElements.length; i++) {
			visibleSpeakerElements[i].classList.remove("visible")
		};
		
		var lightBox = document.querySelector("#lightbox")
		lightBox.classList.remove("visible")
		
	},
	
	nextSpeakerInfo: function(event){
		//get the info modal for the next speaker after the current one
		
		var currentSpeakerElement = event.currentTarget.parentElement.parentElement.parentElement
		var allSpeakerElements = Array.prototype.slice.call(document.querySelectorAll('.speaker-hero'));
		if (currentSpeakerElement) {
			var currentSpeakerIndex = allSpeakerElements.indexOf(currentSpeakerElement);
			
			if (currentSpeakerIndex === allSpeakerElements.length) {
				var nextSpeakerElement = allSpeakerElements[0]
			}
			
			else if (currentSpeakerIndex !== -1 ) {
				var nextSpeakerElement = allSpeakerElements[currentSpeakerIndex + 1]
			}
		
			nextSpeakerElement.querySelector(".speaker-more").classList.add("pause-transition")
			nextSpeakerElement.querySelector(".speaker-more").classList.add("visible")
			nextSpeakerElement.querySelector(".speaker-more").classList.remove("pause-transition")

			var currentSpeakerMore = currentSpeakerElement.querySelector(".speaker-more")
			currentSpeakerMore.classList.add("pause-transition")
			currentSpeakerMore.classList.remove("visible")
			currentSpeakerMore.classList.remove("pause-transition")
		
		}
		
		event.stopPropagation()
		
		
	},
	
	previousSpeakerInfo: function(event){
		//get the info modal for the next speaker before the current one
			
		var currentSpeakerElement = event.currentTarget.parentElement.parentElement.parentElement
		var allSpeakerElements = Array.prototype.slice.call(document.querySelectorAll('.speaker-hero'));
		if (currentSpeakerElement) {
			var currentSpeakerIndex = allSpeakerElements.indexOf(currentSpeakerElement);
			
			if (currentSpeakerIndex === 0) {
				var nextSpeakerElement = allSpeakerElements[allSpeakerElements.length]
			}
			
			else if (currentSpeakerIndex !== -1 ) {
				var nextSpeakerElement = allSpeakerElements[currentSpeakerIndex - 1]
			}
		
			currentSpeakerElement = currentSpeakerElement.querySelector(".speaker-more").classList.remove("visible")
			nextSpeakerElement.querySelector(".speaker-more").classList.add("visible")
		
		}
		
		event.stopPropagation()
	},
	
	togglePriceDetails: function(event){
		
		//hide any open detail box
		
		var openDetails = document.querySelector('.pricing-more.open')
		if (openDetails) {
			openDetails.classList.remove('open')
		}
		
		//now get the associated details box and open that
		
		var newDetails = event.currentTarget.parentElement.nextElementSibling
		
		if (openDetails === newDetails) {
			return
		}
		
		if (newDetails){
			newDetails.classList.add('open')
		}
	
	},
	
	stopPropagation: function(event){
		event.stopPropagation()
	}
	
}

window.addEventListener('load', helpers.init, false)