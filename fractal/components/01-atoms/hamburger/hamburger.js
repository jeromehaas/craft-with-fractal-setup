class Hamburger {
	constructor() {
		this.name = 'hamburger';
		this.elements = {
			hamburger: document.querySelector('.hamburger')
		}
		this.init();	
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.elements.hamburger.addEventListener('click', () => this.toggle());
	};

	toggle() {
		this.elements.hamburger.classList.toggle('hamburger--active');
	}

}

new Hamburger();