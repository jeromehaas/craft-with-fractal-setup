class File {
	
	constructor() {
		this.name = 'file';
		this.elements = {
			inputs: document.querySelectorAll('.file')
		};
		this.init();
	};

	init() {
		if (!document.querySelector(`.js-${this.name}`)) return false;
		this.addEventListener();
	};

	addEventListener() {
		[...this.elements.inputs].forEach((input) => {
			input.addEventListener('change', (event) => this.updateFileName(event.target));
		});
	};

	updateFileName(element) {
		const fileName = element.files[0].name;
		const parent = element.closest('.file');
		const fakeInput = parent.querySelector('.file__fake-input');
		fakeInput.value = fileName;
	}

}

new File();