import gsap from 'gsap'
import SplitText from '../vendor/SplitText'
import store from '../store'

class Preloader {
	constructor() {
		this.dom = {
			header: document.querySelector('.js-site-head'),
			mask: document.querySelector('.js-preloader'),
			path: document.querySelector('.js-preloader__transition')
		}
		
		this.coords = {
			in: [
				"M 0,10 L 10,10 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 Z",
				"M 0,10 L 10,10 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 Z",
				"M 0,10 L 10,10 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 Z"
			]
		}

		gsap.set(this.dom.mask, {
			yPercent: 0,
			scaleY: 1
		})

		store.isLocked = true

		this.lines = null

		this.init()
	}

	split() {
		const lines = document.querySelectorAll('.js-intro-line')

		if (lines) {
		  this.lines = []
		  lines.forEach(line => {
		    const split = new SplitText(line, { type: 'words, chars' })
		    this.lines.push(split)
		  })
		}
	}
	
	runTransition = () => {
		const { mask, path, header } = this.dom
		
		this.tl = gsap.timeline({
			onComplete: () => {
				store.isLocked = false
			}
		})
		
		this.tl
		.set(header, { yPercent: -100, alpha: 0 })
		.set(mask, { yPercent: 0, scaleY: 1 })
		.set(path, { attr: { d: this.coords.in[2] } })
		.to(path, { attr: { d: this.coords.in[1] }, duration: 1.5, ease: 'expo.inOut' }, 0)
		.to(path, { attr: { d: this.coords.in[0] }, duration: 1.5, ease: 'expo' }, 0.8)
		.to(header, { yPercent: 0, alpha: 1, duration: 1.5, ease: 'expo' }, 0.7)

		if (this.lines) {
			this.lines.forEach(split => {
				this.tl
				.from(split.chars, {
					yPercent: -150,
					duration: 1.5,
					stagger: 0.05,
					ease: 'expo'
				}, 0.5)
			})
		}
	}

	init() {
		this.split()
		this.runTransition()
	}
}

export default Preloader