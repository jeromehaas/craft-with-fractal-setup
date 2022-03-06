class Lottie {

	constructor() {
		this.container = document.getElementById('lottie')
		this.options = {
			loop: true,
			autoplay: true,
			path: '/media/lotties/lottie-checkmark.json',
			renderer: 'svg'
		}
		this.status = 'playing';
		this.init();
	};
	
	init() {
		this.load();
		this.addEventListener();
	};

	addEventListener() {
		this.container.addEventListener('click', this.toggle);
	};

	load() {
		const myLottie = lottie.loadAnimation({
			container: this.container, 
			renderer: this.options.renderer,
			loop: this.options.loop,
			autoplay: this.options.autoplay,
			path:  this.options.path
		});
		console.log(myLottie);
	};

	toggle() {
		const state = lottie.getRegisteredAnimations()[0];
		state.isPaused ? lottie.play() : lottie.pause();
	};

};

new Lottie();