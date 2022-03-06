class Range {

	constructor() {
		this.ranges = document.querySelectorAll('.range');
		this.init();
	}
	
	init() {
		this.addEventListener();
		this.initStyle();
	};

	addEventListener() {
		[...this.ranges].forEach((range) => {
			range.addEventListener('input', (event)  => this.updateStyle(event.target));
		});
	};
	
	initStyle() {
		[...this.ranges].forEach((range) => {
		 const input = range.querySelector('.range__input');
		 this.updateStyle(input);
		});
	};
	
	updateStyle(element) {
		const value = (element.value-element.min)/(element.max-element.min)*100;  
		element.style.background = `linear-gradient(to right, #757575 0%, #757575 ${value}%, #dadada ${value}%, #dadada 100%)`;
	};

};

new Range();