class Lottie {

	constructor() {
		this.name = 'lottie';
		this.options = {
			loop: true,
			autoplay: true,
			path: '/media/lotties/lottie-checkmark.json',
			container: document.getElementById('lottie'),
			renderer: 'svg'
		}
		this.status = 'playing';
		this.init();
	};
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.load();
		this.addEventListener();
	};

	addEventListener() {
		this.options.container.addEventListener('click', this.toggle);
	};

	load() {
		lottie.loadAnimation({
			container: this.options.container, 
			renderer: this.options.renderer,
			loop: this.options.loop,
			autoplay: this.options.autoplay,
			path:  this.options.path
		});
	};

	toggle() {
		const state = lottie.getRegisteredAnimations()[0];
		state.isPaused ? lottie.play() : lottie.pause();
	};

};

new Lottie();