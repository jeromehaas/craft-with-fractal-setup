class HelloWorld {
	
	constructor() {
		this.message = 'Hello World';
		this.name = 'hello-world';
		this.init();
	}
	
	init() {
		if (!document.querySelector(`.js-${this.name}`)) return
		console.log(this.message);
	}

}

new HelloWorld();