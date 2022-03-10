"use strict";

class Navigation {

	constructor() {
		this.name = 'navigation-mobile';
		this.hamburger = document.getElementById('hamburger');
		this.backgroundLayer = document.getElementById('background-layer');
		this.panel = document.getElementById('panel');
		this.aboutLink = document.getElementsByClassName('links__item--has-childs')[0];
		this.loginLink = document.getElementsByClassName('links__item--has-childs')[1];
		this.aboutLinkSublinkBox = document.getElementsByClassName('navigation-mobile__dropdown')[0];
		this.loginLinkSublinkBox = document.getElementsByClassName('navigation-mobile__dropdown')[1];
		this.init();
	}
	
	init = () => {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.hamburger.addEventListener("click", this.toggleMenu);
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

const navigationInstance = new Navigation;