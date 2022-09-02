var scroller = {
	init:function() {
		this._subnav = $('a[href*="#"]:not([href="#"])').not('.more').not('a[href="#tooltip"]');
		this.checkHash();
		this.bindings();
	},
	bindings:function() {
		scroller._subnav.click(scroller.scrollToSection);
	},
	checkHash:function() {
		if(window.location.hash) {
		  	var hash = window.location.hash.substring(1);
		  	console.log(hash);
		  	scroller.scrollIt('#'+hash);
		}
	},
	scrollToSection:function(e) {
	
		var target = false;
		if($(this).attr('href')[0] != '#') {
			var location = window.location.pathname.split('/');
			var currentPage = '/'+location[location.length-1];
			var linkPage = $(this).attr('href').split('#')[0];
			if(linkPage != currentPage) {
				return;
			} else {
				var h = $(this).attr('href').split('#');
				target = '#'+h[h.length-1];
			}
		}

		e.preventDefault();
		site._subdrop.removeClass('show');
		if(!target) { target = $(this).attr("href") };
		scroller._subnav.removeClass('selected');
		$(this).addClass('selected');
		var offset = $(target).offset().top;
		if($(target).hasClass('scroll-exactly')){
			var additionalOffset = 105
		} else if($(target).hasClass('scroll-extra')){
			var additionalOffset = 200
		} else {
			var additionalOffset = 135
		}

		$('html, body').animate({
			scrollTop: offset - additionalOffset
		}, Math.abs(window.scrollY - offset) * 0.5);

		if(history.pushState) {
			history.pushState(null, null, target);
		}
		else {
			location.hash = target;
		}
		return false;
	},
	scrollIt:function(h) {
		var target = h;
		var offset = $(target).offset().top;

		if($(target).hasClass('scroll-exactly')){
			var additionalOffset = 105
		} else {
			var additionalOffset = 135
		}

		$('html, body').animate({
                    scrollTop: offset - additionalOffset
        }, Math.abs(window.scrollY - offset) * 0.5);

        if(history.pushState) {
			history.pushState(null, null, target);
		}
		else {
			location.hash = target;
		}
	}
}

scroller.init();