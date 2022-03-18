"use strict";

class NavigationDesktop {

	constructor() {
		this.name = 'navigation';
	}
	
	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.aboutLink.addEventListener("click", (event) => this.showAboutSublinks(event));
		this.loginLink.addEventListener("click", (event) => this.showLoginSublinks(event));
	}

	toggleMenu = () => {
		this.hamburger.classList.toggle('hamburger--active');
		this.panel.classList.toggle('navigation-mobile__panel--open');
		this.backgroundLayer.classList.toggle('navigation-mobile__background-layer--active');
	}

	showAboutSublinks = (event) => {
		event.preventDefault();
		this.aboutLinkSublinkBox.classList.toggle('dropdown--open');
	}
	
	showLoginSublinks = (event) => {
		event.preventDefault();
		this.loginLinkSublinkBox.classList.toggle('dropdown--open');
	}

}

export default NavigationDesktop;