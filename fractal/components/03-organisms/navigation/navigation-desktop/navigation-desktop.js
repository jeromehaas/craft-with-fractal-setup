class NavigationDesktop {

	constructor() {
		this.name = 'navigation';
		this.scrollDirection = 'down';
		this.scrollPosition = 0;
		this.elements = {
			bar: document.querySelector('.navigation-desktop'),
			logo: document.querySelector('.navigation-desktop__logo')
		}
		this.logos = {
			small: '/media/graphics/logos/logo-small.svg',
			big: '/media/graphics/logos/logo-big.svg'
		}
		this.init();
	}
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.addEventListener();	
	}

	setScrollDirection() {
		if (window.pageYOffset > this.scrollPosition) {
			this.elements.bar.classList.add('navigation-desktop--hidden')
		} else {
			this.elements.bar.classList.remove('navigation-desktop--hidden')
			this.setLogoVersion();
		}
		this.scrollPosition = window.pageYOffset;
	}
	
	setLogoVersion() {
		if (window.pageYOffset > 0) {
			this.elements.logo.src = this.logos.small;
		} else {
			this.elements.bar.classList.add('navigation-desktop--hidden')
			setTimeout(() => {
				this.elements.bar.classList.add('navigation-desktop--hidden')
				this.elements.logo.src = this.logos.big;
				this.elements.bar.classList.remove('navigation-desktop--hidden')
			}, 300);
		}
	}

	addEventListener() {
		window.addEventListener('scroll', () => {
			this.setScrollDirection()
		})
	}




}

export default NavigationDesktop;