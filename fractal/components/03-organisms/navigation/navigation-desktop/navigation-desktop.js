class NavigationDesktop {

	// IN THE CONSTRUCTOR WE CAN DEFINE SOME VARIABLES WHICH WE CAN USE TROUGHOUT OUR SCRIPTS
	// THE CONSTRUCTOR BELOW FIRES IMMIDIALTEY AFTER THE PAGE IS LOADED
	constructor() {
			this.name = 'navigation';
			this.scrollDirection = 'down';
			this.scrollPosition = 0;
			// ELEMENTS ARE THE NODES FROM THE HTML TREE
			this.elements = {
					bar: document.querySelector('.navigation-desktop'),
					logo: document.querySelector('.navigation-desktop__logo')
			}
			// HERE ARE THE PATHS TO THE SMALL AND THE BIG LOGO VERSIONS
			this.logos = {
					small: '/media/graphics/logos/logo-small.svg',
					big: '/media/graphics/logos/logo-big.svg'
			}

			// WHEN ALL FUNCTIONS ARE DECLARED WE EXECUTE THE INITIALIZE FUNCTION
			this.init();
	}

	init() {
			// HERE WE CHECK IF WE CAN FIND THE HTML NODE WITH THE CLASS 'js-navigation'
			// IF WE CANT FIND THIS NODE WE DONT EXECUTE OUR SCRIPTS FOR PERFORMANCE ISSUES
			if (!document.querySelector(`.js-${this.name}`)) return false;
			// IF WE HAVE THE NODE THE FUNCTION WHICH ADDS THE EVENTLISTENER IS TRIGGERED
			this.addEventListener();
	}

	// HERE WE SET A LISTENER, WHICH LISTENS FOR THE SCROLL EVENT
	// WHENEVER A SCROLL IS REGISTERED WE EXECUTE THE FUNCTION TO SET THE NAVIGATION VISIBILITY
	addEventListener() {
			window.addEventListener('scroll', () => {
					this.setNavigationVisibility();
			});
	};

	// THIS SCRIPT EIGHTER SHOWS OR HIDES THE NAVIGATION BY ADDING/REMOVING A CLASS TO THE NAVIGATION NODE
	setNavigationVisibility() {
			// HERE WE CHECK IF THE SCOLL POSITION (PIXELS FROM TOP) IS GREATER THAN BEFORE
			if (window.pageYOffset > this.scrollPosition) {
					// IF THIS IS THE CASE WE ARE SCROLLING DOWN AND WE HIDE THE NAVIGATION
					this.elements.bar.classList.add('navigation-desktop--hidden')
					// IF THE SCROLLPOSITION IS SMALLER THAN BEFORE WE ARE SCROLLING DOWN
			} else {
					// IF THIS IS THE CASE WE ARE SCROLLING UP AND WE SHOW THE NAVIGATION
					this.elements.bar.classList.remove('navigation-desktop--hidden')
					// ALSO WE WANT THE TRIGGER A FUNCTION TO CHECK WHICH LOGO VERSION SHOULD BE SHOWN
					this.setLogoVersion();
			}
			// HERE WE UPDATE THE VARIABLE OF THE SCROLL POSITION
			// WE NEED TO DO THIS TO CHECK FOR THE NEXT SCROLL UPDATE IF WE ARE SCROLLING UP OR DOWN
			this.scrollPosition = window.pageYOffset;
	}

	// THIS FUNCTION CHECKS IF WE ARE ON THE VERY TOP AND SHOW THE BIG LOGO OR IF WE SHOULD SHOW THE SMALL LOGO
	setLogoVersion() {
			if (window.pageYOffset > 0) {
					// IF WE ARE NOT ON THE VERY TOP SHOW THE SMALL LOGO
					this.elements.logo.src = this.logos.small;
			} else {
					// IF WE ARE ON THE VERY TOP HIDE THE NAVIGATION
					this.elements.bar.classList.add('navigation-desktop--hidden')
					// THEN WAIT FOR 300MS -> THEN CHANGE THE LOGO AND SHOW THE NAVIGATION BAR AGAIN
					setTimeout(() => {
							this.elements.logo.src = this.logos.big;
							this.elements.bar.classList.remove('navigation-desktop--hidden')
					}, 300);
			}
	}




}

export default NavigationDesktop;