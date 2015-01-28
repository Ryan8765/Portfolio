$(document).ready(function() {
//--------------------------------
	var navColors = {
		isWhite : "no",
		//scroll height function to change color of nav links and background of nav
		navFunction : function() {
			//height from top portfolio to top window
			var portfolioDistance = $('#portfolio').offset().top;
			var scrollPosition = $(window).scrollTop();
			//height of header
			var headerHeight = $('header').outerHeight();
			//if header scrolls into portfolio and color isn't what it should be...change colors else if change back to original colors.
			if (scrollPosition > portfolioDistance - headerHeight && this.isWhite == "no") {
				$('header').css('background', 'rgba(255,255,255,1)');
				$('header a').css('color', 'black');
				this.isWhite = "yes";
				console.log("first if triggered");
			} else if (scrollPosition < portfolioDistance - headerHeight && this.isWhite == "yes") {
				$('header').css('background', 'rgba(255,255,255,.2)');
				$('header a').css('color', 'white');
				this.isWhite = "no";
			}
		}
	};//end object

	$(window).scroll(function() {
		navColors.navFunction();
	});
	
	//create a jquery plugin that allows you to scroll to a specific point after clicking a link
	$.fn.slowScroll = function(clicked) {
		//grab the links href which is set to the desired element ID you want to scroll to.
		var elementId = clicked.attr('href');
		$('html, body').animate({
        	scrollTop: $("#" + elementId).offset().top
    	}, 2000);
    	console.log(elementId);
	};

	$('header a').on('click', function(event){
		//stop the normal default of clicked "a" link
		event.preventDefault();
		//grab the specific link clicked on and pass this to the SlowScroll function
		var clicked = $(this);
		//target your clicked links and pass "clicked" to the jquery pluggin
		$('header a').slowScroll(clicked);
	}); 
	 


	
//----------------------------------	
});
