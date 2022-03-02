class CookieBanner {
 
	constructor() {
		this.name = 'cookie-banner';
		this.today = new Date();
		this.cookie = {
			name: 'agb-agreement',
			value: 'accepted',
			expirationDays: 7
		}
		this.elements = {
			banner: document.querySelector('.cookie-banner'),
			button: document.querySelector('.cookie-banner__button')
		}
		this.init();
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.elements.button.addEventListener('click', () => this.setCookie());
		this.checkCookie();
	}
	
	setCookie() {
		let date = new Date();
		date.setDate(new Date().getDate() + this.cookie.expirationDays)
		date = date.toUTCString();
		document.cookie = `${this.cookie.name}=${this.cookie.value}; expires=${date}`;
		console.log('cookie set')
		this.hideBanner();
	}

	showBanner() {
		this.elements.banner.classList.add('cookie-banner--visible');
	}
	
	hideBanner() {
		this.elements.banner.classList.remove('cookie-banner--visible');
	}

	checkCookie() {
		const cookies = document.cookie.split(';');
		setTimeout(() => {
			if (!cookies.includes(`${this.cookie.name}=${this.cookie.value}`)) this.showBanner();
		}, 5000);
	}

};

new CookieBanner();