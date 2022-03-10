class Slider {

	constructor() {
		this.name = 'slider';
		this.elements = {
			arrows: {
				right: document.querySelector('.slider__arrow--right'),
				left: document.querySelector('.slider__arrow--left')
			},
			content: document.querySelector('.slider__content'),
			items: document.querySelectorAll('.slider__item'),
		}
		this.numberOfItems = document.querySelectorAll('.slider__item').length,
		this.currentIndex = 1;
		this.animationDuration = 600 / 2;
		this.swipePositions = {
			start: null,
			end: null,
		};
		this.init();
	}

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.addEventListener()
	}

	addEventListener() {
		this.elements.arrows.right.addEventListener('click', () => this.countUp());
		this.elements.arrows.left.addEventListener('click', () => this.countDown());
		this.elements.content.addEventListener('touchstart', (event) => this.swipeStart(event));
		this.elements.content.addEventListener('touchend', (event) => this.swipeEnd(event));
	}

	countUp() {
		const index = this.currentIndex;
		this.currentIndex = this.fixNumber(index + 1);
		this.updateSlider();
	}

	countDown() {
		const index = this.currentIndex;
		this.currentIndex = this.fixNumber(index - 1);
		this.updateSlider();
	}

	fixNumber(number) {
		if (number >= this.numberOfItems) return 0;
		if (number < 0) return this.numberOfItems - 1;
		return number;
	}

	removeClasses() {
		[...this.elements.items].forEach((item) => {
			item.classList.remove('slider__item--previous', 'slider__item--active', 'slider__item--next');
		});
	}

	updateSlider() {
		this.removeClasses();
		this.disableArrows();
		const index = this.currentIndex;
		const previousIndex = this.fixNumber(index - 1);
		const activeIndex = this.fixNumber(index);
		const nextIndex = this.fixNumber(index + 1);
		const previous = [...this.elements.items][previousIndex];
		const active = [...this.elements.items][activeIndex];
		const next = [...this.elements.items][nextIndex];
		previous.classList.add('slider__item--previous')
		active.classList.add('slider__item--active');
		next.classList.add('slider__item--next');
	}

	disableArrows() {
		this.elements.arrows.left.classList.add('slider__arrow--disabled');
		this.elements.arrows.right.classList.add('slider__arrow--disabled');
		setTimeout(() => {
			this.elements.arrows.left.classList.remove('slider__arrow--disabled');
			this.elements.arrows.right.classList.remove('slider__arrow--disabled');
		}, this.animationDuration);
	}

	swipeStart(event) {
		const position = event.touches[0].clientX;
		this.swipePositions.start = position;
	}

	swipeEnd() {
		const position = event.changedTouches[0].clientX;
		this.swipePositions.end = position;
		this.swipePositions.start < this.swipePositions.end ? this.countDown() : this.countUp();
	}

}

new Slider();