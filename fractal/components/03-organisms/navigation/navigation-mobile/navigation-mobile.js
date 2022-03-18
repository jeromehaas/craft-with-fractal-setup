"use strict";

class NavigationMobile {

	constructor() {
		this.name = 'navigation-mobile';
		this.hamburger = document.querySelector('.hamburger');
		this.backgroundLayer = document.querySelector('.navigation-mobile__background-layer');
		this.panel = document.querySelector('.navigation-mobile__panel');
		this.linksWithSublinks = document.querySelectorAll('.navigation-mobile__link--has-sublinks')
		this.init();
	};
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.hamburger.addEventListener("click", () => this.toggleMenu());
		[...this.linksWithSublinks].forEach((item) => {
			item.addEventListener('click', (event) => this.showSublinks(event.target))
		});
	};

	toggleMenu() {
		this.hamburger.classList.toggle('hamburger--active');
		this.panel.classList.toggle('navigation-mobile__panel--open');
		this.backgroundLayer.classList.toggle('navigation-mobile__background-layer--active');
	};

	showSublinks(element) {
		const parent = element.closest('.navigation-mobile__link');
		const dropdown = parent.querySelector('.navigation-mobile__dropdown')
		dropdown.classList.toggle('navigation-mobile__dropdown--open');
	};

};

export default NavigationMobile;