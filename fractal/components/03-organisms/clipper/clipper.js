import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

class Clipper {

	constructor() {
		this.elements = {
			container: document.querySelector('.clipper'),
			image: document.querySelector('.clipper__image')
		};
		this.clipping = {
			top: 50,
			right: 0,
			bottom: 0,
			left: 0
		};
		this.timeline = gsap.timeline({
			scrollTrigger: {
				trigger: '.clipper',
				markers: true, 
				start: "top center",
				end: "bottom center",
				onUpdate: ({ progress }) => {
					this.slide(progress);
					this.zoom(progress);
				}
			}
		});
		this.init();
	};

	init = () => {
		this.addEventListener();
		console.log(this.elements.image);
	};

	addEventListener = () => {
		this.elements.image.addEventListener('click', () => this.animate());
	};

	slide = (progress) => {
		this.elements.image.style.clipPath = `inset(
		${20 - (progress * 20)}%
		${50 - (progress * 50)}%
		${0 + (progress * 20)}%
		${0 + (progress * 50)}%
		)`;
	};

	zoom = (progress) => {
		// this.elements.image.style.transform = `scale(${progress - 1.2})`;
	}


};

export default Clipper;