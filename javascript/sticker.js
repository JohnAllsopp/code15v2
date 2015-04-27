//simply sticks the given element at the location specified
//when the scroll changes, 

//v.01
//for now, this only works for sticking the element to the top of the window

var sticker = {

	stuckElement: null, //element we're tracing to stick/unstick
	clonedElement: null, //we need to clone the stuck element
	stuckElementStaticTop: 0, //this is the top of the element to stick when laid out statically
	stuckPageScrollX: 0, //page Scroll when the element was stuck
	nativeSupport: false, //is there native support for position: sticky?
	media: "all", //a media string, for constraints on when we want the function called
	
	pageScrolled: function() {
		//event handler for pageScroll events
		
		if (window.matchMedia(sticker.media).matches) {
		
		
			if (sticker.stuckElementStaticTop < window.scrollY) {
				//we've scroll the element to the top of the page
				//if we've not already stuck it, we'll do that now
			
				if (!sticker.stuckElement.classList.contains('stickerStuck')) {
				
					sticker.stuckElement.classList.add('stickerStuck');
				
				
					if (!sticker.nativeSupport) {
						sticker.clonedElement = sticker.stuckElement.cloneNode(true);
						sticker.stuckElement.parentElement.insertBefore(sticker.clonedElement, sticker.stuckElement)
						sticker.stuckElement.style.position = "fixed";
						sticker.stuckElement.style.top = 0;
						sticker.clonedElement.style.opacity = 0;
					
					}				
								
				}
			}
		
			else {
				//if it's stuck, we need to unstick it
			
			
					if (sticker.stuckElement.classList.contains('stickerStuck')) {
						sticker.stuckElement.classList.remove('stickerStuck');					
					
						if (!sticker.nativeSupport) {
						sticker.clonedElement.parentElement.removeChild(sticker.clonedElement);
						sticker.stuckElement.style.position = null;
						sticker.stuckElement.style.top = null;
					}
				
				}

					sticker.stuckElement.classList.remove('stickerStuck');
			}
		}
	},
	
	init: function(element, media) {
		//initialize sticker for the element passed
		
		//if sticky is supported, don't initialize
		
		var style = window.getComputedStyle(element);
		
		if (media) {
			sticker.media = media
		}
			
		if (style.position.indexOf("sticky") !== -1) {
			sticker.nativeSupport = true
		}
		
		sticker.stuckElement = element;
		sticker.stuckElementStaticTop = element.offsetTop //only works for an element with no containign element positioned 
	}
}

window.addEventListener("scroll", sticker.pageScrolled, false)
