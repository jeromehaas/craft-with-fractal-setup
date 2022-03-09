class Droppdown {
	
	constructor() {
		this.name = 'dropdown';
		this.elements = {
			dropdowns: document.querySelectorAll('.dropdown')
		}
		this.init();
	};

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return;
		this.addEventListeners();
	};

	addEventListeners() {
		[...this.elements.dropdowns].forEach((dropdown) => {
			const labels = dropdown.querySelectorAll('.option__label');
			[...labels].forEach((label) => {
				label.addEventListener('click', (event) => this.updatePlaceholderText(event));
			})
		});
	}

	updatePlaceholderText(event) {
		const text = event.target.innerText;
		const dropdown = event.target.closest('.dropdown');
		const input = dropdown.querySelector('.dropdown__input');
		input.innerText = text;
		input.click();
	};

};

new Droppdown();