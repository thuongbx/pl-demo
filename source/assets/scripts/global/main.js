'use strict';

var lazyLoadInstance = new LazyLoad({
	elements_selector: '.lazyload',
});


var site = {
	init: function () {
		this.win = this.getSizes();
		this._window = $(window);
		this._header = $('header');
		this._drop = $('.drop');
		this.lastScroll = 0;
		
		this._more = $('.more');
		this._subdrop = $('.sub-nav-drop');
		this.scrollOffset = 150;

		this._searchbar = $('.searchbar');
		this._searchField = $('.search-field');
		this._subnav = $('.sub-nav .main-sub-nav a').not('.more');

		this._mobileMenu = $('.mobile-menu');
		this._hamburger = $('.hamburger');

		this._logoscroller = $('.logos');
		// this.setScrollerWidth();
		this.updateSubnav();

		this.bindings();
	},
	getSizes: function () {
		return {
			w: window.innerWidth,
			h: window.innerHeight,
			hh: $('#hero').height(),
		};
	},
	bindings: function () {
		site._window.scroll(site.scroll);
		site._window.scroll();
		site._window.resize(site.resize);

		site.lastScroll = site._window.scrollTop();

		site._drop.click(site.keepOpen);
		$('.search').click(site.openSearch);
		$('.mobile-search').click(site.openMobileSearch);
		$('.search').on('keypress', function(event) {
			var code = event.charCode || event.keyCode;
			if((code === 32)|| (code === 13)){
				site._searchbar.addClass('show');
				site._searchField.focus();
			}
		});
		site._searchField.click(site.keepOpen);
		site._more.click(site.subdropdown);
		// site._subnav.click(site.scrollToSection);
		$('.filter-toggle').click(site.toggleFilters);
		$('.change-careers').click(site.toggleTabs);
		// $('.faq-question').click(site.toggleFaq);
		
		document.querySelectorAll('.has-dropdown').forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				let currentlyOpen = document.querySelector('.drop.show');
				if(currentlyOpen){
					currentlyOpen.classList.remove('show');
				}
				let thisDropdown = item.parentNode.querySelector('.drop');
				thisDropdown.classList.add('show');
			});
			item.addEventListener('focus', (e) => {
				e.preventDefault();
				e.stopPropagation();
				let currentlyOpen = document.querySelector('.drop.show');
				if(currentlyOpen){
					currentlyOpen.classList.remove('show');
				}
				let thisDropdown = item.parentNode.querySelector('.drop');
				thisDropdown.classList.add('show');
			});
		});
		

		$('body').addClass('loaded');

		$('a[href="#tooltip"]')
			.click(function (e) {
				e.preventDefault();
				e.stopPropagation();
				if ($(this).hasClass('hovering')) {
					$('.tooltip').remove();
					$(this).removeClass('hovering');
				} else {
					var text =
						$(this).attr('title') || $(this).attr('data-copy');
					$(this).attr('data-copy', text);
					$(this).attr('title', '');
					$(this).append('<div class="tooltip">' + text + '</div>');
					$(this).addClass('hovering');
				}
				return false;
			})
			.mouseenter(function (e) {
				e.preventDefault();
				if (!$(this).hasClass('hovering')) {
					var text =
						$(this).attr('title') || $(this).attr('data-copy');
					$(this).attr('data-copy', text);
					$(this).attr('title', '');
					$(this).append('<div class="tooltip">' + text + '</div>');
					$(this).addClass('hovering');
				}
			})
			.mouseleave(function () {
				$('.tooltip').remove();
				$(this).removeClass('hovering');
			});

		$('.tooltip').click(function (e) {
			e.preventDefault();
			e.stopPropagation();
			$('.tooltip').remove();
		});

		$('.show-postcode-form').click(function (e) {
			$('.form-cover').fadeOut();
			$('.form-wrapper').addClass('show-postcode');
		});

		$('.show-normal-form').click(function (e) {
			$('.form-cover').fadeOut();
			$('.form-wrapper').addClass('show-normal');
		});

		site._hamburger.click(site.toggleMobileMenu);
		//================================================================================================================================
		// this goes last!!!
		$(window).click(site.close);
	},
	scroll: function () {
		var st = site._window.scrollTop();
		st > site.win.hh - 100
			? site._header.addClass('white')
			: site._header.removeClass('white');
	},
	dropdown: function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('show');
	},
	subdropdown: function (e) {
		e.preventDefault();
		e.stopPropagation();
		site._subdrop.toggleClass('show');
		if (site._subdrop.height() + site._subdrop.offset().top > site.win.h) {
			const offset = site._subdrop.offset().top;
			$('html, body').animate(
				{
					scrollTop: offset - 135,
				},
				Math.abs(window.scrollY - offset) * 0.5
			);
		}
	},
	close: function (e) {
		if (site._drop.hasClass('show')) site._drop.removeClass('show');
		if (site._subdrop.hasClass('show')) site._subdrop.removeClass('show');
		if (site._searchbar.hasClass('show')) {
			site._searchbar.removeClass('show');
			site._searchField.val('');
		}
		if ($('.tooltip').length) {
			$('.tooltip').remove();
			$('a[href="#tooltip"]').removeClass('hovering');
		}
	},
	keepOpen: function (e) {
		e.stopPropagation();
	},
	openSearch: function (e) {
		e.preventDefault();
		e.stopPropagation();
		site._searchbar.addClass('show');
		site._searchField.focus();
	},
	openMobileSearch: function (e) {
		e.preventDefault();
		e.stopPropagation();
		$('.mobile-searchbar').addClass('show');
		$('.mobile-search-field').focus();
	},
	scrollToSection: function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		site._subnav.removeClass('selected');
		$(this).addClass('selected');
		var target = $(this).attr('href');
		var offset = $(target).offset().top;
		$('html, body').animate(
			{
				scrollTop: offset - 135,
			},
			Math.abs(window.scrollY - offset) * 0.5
		);

		if (history.pushState) {
			history.pushState(null, null, target);
		} else {
			location.hash = target;
		}
	},
	toggleFilters: function (e) {
		e.preventDefault();
		$('.filter-list').toggleClass('show');
	},
	// toggleFaq: function (e) {
	// 	e.preventDefault();
	// 	$(this).parent().toggleClass('show');
	// 	$('.faqs-container').removeClass('partial-faqs');
	// },
	toggleTabs: function (e) {
		e.preventDefault();
		var newTab = $(this).attr('data-tab');
		$('.careers-types-container').attr('data-show', newTab);
		$('.selected-tab').removeClass('selected-tab');
		$('.careers-types-container')
			.find('.careers-tab[data-tab="' + newTab + '"]')
			.addClass('selected-tab');
		location.hash = newTab;
		return false;
	},
	updateSubnav: function () {
		if (!site._subnav.length) return;
		site._more.removeClass('show');
		site._subdrop.removeClass('show').html('');
		const overflow = site._subnav.parent()[0].scrollWidth;
		var width = site._more.hasClass('show')
			? site.win.w - (site._more.outerWidth() + 40)
			: site.win.w;
		if (overflow > width) {
			site._subnav.parent().addClass('left');
			site._more.addClass('show');
			width = site.win.w - (site._more.outerWidth() + 40);
			for (var a of site._subnav) {
				const rect = a.getBoundingClientRect();
				if (rect.right >= width) {
					var el = $(a).clone();
					if (!$('body').is('#careers')) {
						el.bind('click', scroller.scrollToSection);
					} else {
						el.click(function (e) {
							e.preventDefault();
							var target = $(this).attr('href');
							if (history.pushState) {
								history.pushState(null, null, target);
								careers.checkHash();
							} else {
								location.hash = target;
							}
							return false;
						});
					}
					el.appendTo(site._subdrop);

					$(a).addClass('hide');
				} else {
					// site._subnav.parent().append($(a))
					$(a).removeClass('hide');
					// site._subdrop.find('a[href="'+$(a).attr('href')+'"]').remove()
				}
			}
		} else {
			site._subnav.removeClass('hide');
			site._subnav.parent().removeClass('left');
		}
	},
	resize: function () {
		site.win = site.getSizes();
		site.updateSubnav();
	},
	setScrollerWidth: function () {
		if (!site._logoscroller.length) return;
		var w = site._logoscroller[0].scrollWidth;
		site._logoscroller.css({
			width: w,
			'animation-duration': w / 100 + 's',
		});
	},
	toggleMobileMenu: function () {
		$('body').toggleClass('show-mobile-menu');
	},
};

site.init();

// Sub Nav Highlighting as you scroll

$(window).scroll(function () {
	var scrollDistance = $(window).scrollTop();
	var halfWindow = window.innerHeight / 2;

	$('.scroll-target').each(function (i) {
		if ($(this).position().top <= scrollDistance + halfWindow) {
			$('.sub-nav a.active').removeClass('active');
			$('.sub-nav a').eq(i).addClass('active');
		}
	});
});

var quote = {
	init: function () {
		this.param = 'q';
		this.postcode = '';
		this._form = $('.quote-form');
		this._formWrapper = $('.enter-postcode-wrapper');
		this._postcode = $('.quote-postcode');
		this._results = $('.quote-result-wrapper');
		this._error = $('.quote-error');
		this.bindings();
		this.postcodeRegEx = /[A-Z]{1,2}[A-Z0-9]{1,2} ?[0-9][A-Z]{2}/i;
		this.checkQuery();
		this.sourceparam = 's';
		this.source = '';
		this._source = $('.quote-source');
		this.hasSource = false;
		this.landingparam = 'l';
		this.landing = '';
		this._landing = $('.quote-landing');
		this.hasLanding = false;
	},
	bindings: function () {
		$('.submit-quote').click(function (e) {
			e.preventDefault();
			quote.postcode = quote._postcode
				.val()
				.replace(/\s+/g, '')
				.toUpperCase();
			if (quote._source.length && quote._source.val().length) {
				quote.hasSource = true;
				quote.source = quote._source.val().replace(/\s+/g, '');
			}
			if (quote._landing.length && quote._landing.val().length) {
				quote.hasLanding = true;
				quote.landing = quote._landing.val().replace(/\s+/g, '');
			}
			quote.validateInput();
		});
	},
	checkQuery: function () {
		if (window.location.search.match('q')) {
			try {
				const url = window.location.href;
				const query_str = url.substr(
					url.indexOf('?') + 1,
					url.length - 1
				);
				const r_params = query_str.split('&');
				var params = {};
				var found = false;
				for (var i in r_params) {
					const param = r_params[i].split('=');
					params[param[0]] = param[1];
					if (param[0] == quote.param) {
						quote.postcode = param[1];
						quote.validateQuery();
						found = true;
					}
				}
				if(!found) {
					quote._formWrapper.addClass('show');
				}
			} catch (e) {
				console.log(e);
			}
		} else {
			quote._formWrapper.addClass('show');
		}
	},
	validate: function () {
		return quote.postcodeRegEx.test(quote.postcode);
	},
	validateQuery: function () {
		if (quote.validate()) {
			quote._results.addClass('show');
		} else {
			quote._formWrapper.addClass('show');
		}
	},
	validateInput: function () {
		if (quote.validate()) {
			quote._postcode.val(quote.postcode.replace(/\s+/g, ''));
			let finalSource = '';
			let finalLanding = '';
			if (quote.hasSource) {
				finalSource = '&s=' + quote.source;
			}
			if (quote.hasLanding) {
				finalLanding = '&l=' + quote.landing;
			}
			window.location =
				quote._form.attr('action') +
				'?q=' +
				quote.postcode +
				finalSource +
				finalLanding;
		} else {
			quote._error.addClass('show');
		}
	},
};

quote.init();

class Accordion {
	constructor(el) {
		this.el = el;
		this.summary = el.querySelector('summary');
		this.content = el.querySelector('.faq-answer-wrapper');
		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.summary.addEventListener('click', (e) => this.onClick(e));
	}
	
	onClick(e) {
		e.preventDefault();
		this.el.style.overflow = 'hidden';
		if (this.isClosing || !this.el.open) {
			this.open();
		} else if (this.isExpanding || this.el.open) {
			this.shrink();
		}
	}
	
	shrink() {
		this.isClosing = true;
		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight = `${this.summary.offsetHeight}px`;
		
		if (this.animation) {
			this.animation.cancel();
		}
		
		this.animation = this.el.animate({
			height: [startHeight, endHeight]
		}, {
			duration: 400,
			easing: 'ease-out'
		});
		
		this.animation.onfinish = () => this.onAnimationFinish(false);
		this.animation.oncancel = () => this.isClosing = false;
	}
	
	open() {
		this.el.style.height = `${this.el.offsetHeight}px`;
		this.el.open = true;
		window.requestAnimationFrame(() => this.expand());
	}
	
	expand() {
		this.isExpanding = true;
		const startHeight = `${this.el.offsetHeight}px`;
		const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
		console.log(startHeight, endHeight);
		if (this.animation) {
			this.animation.cancel();
		}
	
		this.animation = this.el.animate({
			height: [startHeight, endHeight]
		}, {
			duration: 400,
			easing: 'ease-out'
		});
		this.animation.onfinish = () => this.onAnimationFinish(true);
		this.animation.oncancel = () => this.isExpanding = false;
	}
	
	onAnimationFinish(open) {
		this.el.open = open;
		this.animation = null;
		this.isClosing = false;
		this.isExpanding = false;
		this.el.style.height = this.el.style.overflow = '';
	}
}

document.querySelectorAll('details').forEach((el) => {
	new Accordion(el);
});