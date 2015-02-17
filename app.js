$(document).ready(function() {
//--------------------------------
	
	var mobileDevice = "/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/";

	//function to change background of header when screen is resized
	var headerBackground = function() {
		if (window.innerWidth < 760) {
			$('header').css('background-color','transparent');
		} else {
			$('header').css('background-color','rgba(255,255,255,.2)');
		}
	};

	//function to hide h2 and logo on scroll for mobile devices
	var mobileScrollHide = function() {
		//only trigger on smaller devices
		if (window.innerHeight < 760) {
			var scrollPosition = $(window).scrollTop();
			if (scrollPosition == 0) {
				$('.mobileSize h1, #mobileLogo').show();
			} else {
				$('.mobileSize h1, #mobileLogo').hide();
			}
		}
	};
	//change the margin top height of portfolio div to fit fixed main image
	var portfolioMargin = function() {
		var windowHeight = window.innerHeight;
		var imageHeight = $('#imageWrap img').height();
		//if windowheight is bigger than image height make portfolio div margin equal to image height, else do the opposite
		if (windowHeight > imageHeight) {
			$('#portfolio').css('margin-top', imageHeight);
		} else {
			
			$('#portfolio').css('margin-top', windowHeight);
		}
	};//end portfolioMargin function

	


	//change navigation colors
	var navColors = {
		// isWhite : "no",
		//scroll height function to change color of nav links and background of nav
		navFunction : function() {
			//height from top portfolio to top document
			var portfolioDistance = $('#portfolio').offset().top;
			var scrollPosition = $(window).scrollTop();
			//height of header
			var headerHeight = $('header').outerHeight();
			if (window.innerWidth > 760) {
				//if header scrolls into portfolio and color isn't what it should be...change colors else if change back to original colors.
				if (scrollPosition > portfolioDistance - headerHeight) {
					$('header').css('background', 'rgba(255,255,255,1)');
					$('header a').css('color', 'black');
				} else if (scrollPosition < portfolioDistance - headerHeight) {
					$('header').css('background', 'rgba(255,255,255,.2)');
					$('header a').css('color', 'white');
					
				} else if (scrollPosition == 0) {
					$('header').css('background', 'rgba(255,255,255,.2)');
					$('header a').css('color', 'white');
					
				}//end if 
			}//end if window size
			//make sure color of header text is white on smaller devices and window resizes
			if (window.innerWidth < 760) {
				$('header a').css('color','white');
			}
		}//end navFunction
	};//end object
	//correct underlines on smaller devices of they have been triggered by javascript
	var correctUnderline = function() {
		if (window.innerWidth < 550) {
			$('.animateLine').css('padding-left', '32px');
			$('.animateLine').css('padding-right', '32px');
		}
	};

	//animate lines on titles when scrolled into view
	var animateLines = {
		animateDuration: 2000,
		elementsToAnimate: $(".animateLine"),
		numElements: $('.animateLine').length,
		elementsAnimated: [],
		animateTitles: function() {
			//how far from the top of the webpage is current element
			var distanceToTop;
			//where is the scroll position currently
			var scrollPosition;
			//current element in question
			var element;
			if(this.numElements > this.elementsAnimated.length && window.innerWidth > 550) {
				//rotate through elements and see if they are within viewing range.
				for(var i = 0; i < this.numElements; i++) {
					//current element
					element = this.elementsToAnimate.eq(i);
					//if you've already animated this particular element continue on the loop
					if (this.elementsAnimated.indexOf(i) > -1) continue;
					//get distance from top of element to top of document
					distanceToTop = element.offset().top;
					//current scroll position
					scrollPosition = $(window).scrollTop();
					//if scroll position is greater than distance to top animate element
					if (distanceToTop + 100 < scrollPosition + window.innerHeight && distanceToTop + 400 > scrollPosition + window.innerHeight) {
						element.animate({
						    paddingRight: "160px",
						    paddingLeft: "160px"
						}, this.animateDuration);
						//keep track of elements that have already been animated
						this.elementsAnimated.push(i);
					}//end if
				}//end for
			}//end if
		}//end animateTitles
	};
	
	
	//create a jquery pluggin that allows you to scroll slowly to a specific point after clicking a link
	(function ( $ ) {
		$.fn.slowScroll = function(clicked) {
			//grab the links href which is set to the desired element ID you want to scroll to.
			var headerHeightLg = $('.fullSize').outerHeight();
			//header height for small devices
			var headerHeightSm = $('.mobileSize').outerHeight();
			var elementId = clicked.attr('href');
			//if on mobile do scrollTo because animations don't work very well on mobile
			if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) { 
				window.scrollTo(0, ($("#" + elementId).offset().top)-(headerHeight - 1));
			} else {
				//if window is greater than 760 use large header for distance
				if (window.innerWidth > 760) {
					$('html, body').animate({
			        	scrollTop: ($("#" + elementId).offset().top)-(headerHeightLg - 1)
			    	}, 2000);
			    //else use small header for distance
			    } else {
			    	$('html, body').animate({
			        	scrollTop: $("#" + elementId).offset().top
			    	}, 2000);
			    }//end else
		    }
		};
	}( jQuery ));//end pluggin function
	//scroll to element clicked
	$('header a').on('click', function(event){
		//stop the normal default of clicked "a" link
		event.preventDefault();
		//grab the specific link clicked on and pass this to the SlowScroll function
		var clicked = $(this);
		//target your clicked links and pass "clicked" to the jquery pluggin to scroll to slowly
		$('header a').slowScroll(clicked);
	});
	//create a function to fadeIn images
	var fadeElements = {
		//length of fade
		fadeTime: 2000,
		//elements to fade in
		elementsToFadeIn: $('.triggerFade'),
		initialLength: $('.triggerFade').length,
		elementsToFadeArray: [],
		alreadyFaded: [],
		fadeStuff: function() {
			//current element to look for distance from top of document
			var currentElement;
			//distance from top of element to top of document
			var distanceToTop;
			//scroll position
			var scrollPosition;
			//if all of the fadein elements aren't showing yet check for them on scroll..otherwise bypass this to save computing
			if (this.alreadyFaded.length < this.initialLength) {
				//for loop to go through all of elements and see if they are within view
				for (var i = 0; i < this.initialLength; i++) {
					//if you have already shown element continue on 
					if (this.alreadyFaded.indexOf(i) > -1) continue;
					//grab the first element in array
					currentElement = this.elementsToFadeIn.eq(i);
					//get distance from top of element to top of document
					distanceToTop = currentElement.offset().top;
					//current scroll position
					scrollPosition = $(window).scrollTop();
					//if scroll position is greater than distance to top fadein element
					if (distanceToTop < scrollPosition + window.innerHeight) {
						currentElement.fadeTo(this.fadeTime, 1);
						this.alreadyFaded.push(i);
					}//end if
				}//end for
			}//end if
		}//end fadestuff function
	};//end fadeData Object


	//functions to run on page refresh and open wrapped in window.load to make sure all images have loaded first.
	$(window).load(function() {
		portfolioMargin();
		navColors.navFunction();
		//if on a mobile device just show triggerfade otherwise fadein.
		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {
			$('.triggerFade').css('opacity','1');
		} else {
			fadeElements.fadeStuff();
		}
	});
	

	//functions to run on window scroll
	$(window).scroll(function() {
		mobileScrollHide();
		navColors.navFunction();
		fadeElements.fadeStuff();
		animateLines.animateTitles();
	});

	//functions to run on page resize
	$(window).resize(function(){
		portfolioMargin();
		headerBackground();
		navColors.navFunction();
		fadeElements.fadeStuff();
		correctUnderline();
	});
	
//----------------------------------	
});
