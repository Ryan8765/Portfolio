$(document).ready(function() {
//--------------------------------
	//change the margin height of portfolio div to fit fixed main image
	/*
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
	*/


	//change navigation colors object
	var navColors = {
		isWhite : "no",
		//scroll height function to change color of nav links and background of nav
		navFunction : function() {
			//height from top portfolio to top document
			var portfolioDistance = $('#portfolio').offset().top;
			var scrollPosition = $(window).scrollTop();
			//height of header
			var headerHeight = $('header').outerHeight();
			//if header scrolls into portfolio and color isn't what it should be...change colors else if change back to original colors.
			if (scrollPosition > portfolioDistance - headerHeight && this.isWhite == "no") {
				$('header').css('background', 'rgba(255,255,255,1)');
				$('header a').css('color', 'black');
				this.isWhite = "yes";
			} else if (scrollPosition < portfolioDistance - headerHeight && this.isWhite == "yes") {
				$('header').css('background', 'rgba(255,255,255,.2)');
				$('header a').css('color', 'white');
				this.isWhite = "no";
			}
		}
	};//end object
	
	//create a jquery plugin that allows you to scroll to a specific point after clicking a link
	$.fn.slowScroll = function(clicked) {
		//grab the links href which is set to the desired element ID you want to scroll to.
		var headerHeight = $('header').outerHeight();
		var elementId = clicked.attr('href');
		$('html, body').animate({
        	scrollTop: ($("#" + elementId).offset().top)-(headerHeight - 1)
    	}, 2000);
    	console.log(elementId);
	};//end pluggin function

	$('header a').on('click', function(event){
		//stop the normal default of clicked "a" link
		event.preventDefault();
		//grab the specific link clicked on and pass this to the SlowScroll function
		var clicked = $(this);
		//target your clicked links and pass "clicked" to the jquery pluggin
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
					console.log("hello");
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

	//functions to run on page refresh and open
	//portfolioMargin();
	fadeElements.fadeStuff();

	//functions to run on window scroll
	$(window).scroll(function() {
		navColors.navFunction();
		fadeElements.fadeStuff();
	});

	//functions to run on page resize
	$(window).resize(function(){
		portfolioMargin();
	});

	
//----------------------------------	
});
