import gsap from 'gsap'

import listener from '../utils/listener'

class Button {
	constructor(el) {
		this.el = el

		this.dom = {
			path: this.el.querySelector('.js-path'),
			title: {
				first: this.el.querySelector('.c-btn__item--first'),
				last: this.el.querySelector('.c-btn__item--last')
			}
		}
		
		this.coords = {
			open: [
				"M 0,10 L 10,10 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 Z",
				"M 0,10 L 10,10 L 10,10 C 10,10 10,5 5,5 C 0,5 0,10 0,10 Z",
				"M 0,10 L 10,10 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 Z"
			],
			close: [
				"M 10,10 L 10,0 C 10,0 10,0 5,0 C 0,0 0,0 0,0 L 0,10 Z",
				"M 10,10 L 10,0 C 10,0 10,5 5,5 C 0,5 0,0 0,0 L 0,10 Z",
				"M 10,10 L 10,10 C 10,10 10,10 5,10 C 0,10 0,10 0,10 L 0,10 Z"
			]
		}

		this.over = false
		this.animating = false

		this.tl = null
		
		this.init()
	}

	onEnter = (e) => {
		this.over = true
		!this.animating && this.open()
	}

	onLeave = (e) => {
		this.over = false
		!this.animating && this.close()
	}
	
	open = () => {
		const { path } = this.dom
		const coords = this.coords

		this.animating = true

		if (this.tl) this.tl.kill()
		this.tl = gsap.timeline()
		.eventCallback('onComplete', () => {
			this.animating = false
			!this.over && this.close()
		})
		.set(path, { attr: { d: coords.open[0] } })
		.to(path, { attr: { d: coords.open[1] }, duration: 0.85, ease: 'expo' }, 0)
		.to(path, { attr: { d: coords.open[2] }, duration: 0.85, ease: 'expo' }, 0.15)
	}
	
	close = () => {
		const { path } = this.dom
		const coords = this.coords

		this.animating = true

		if (this.tl) this.tl.kill()
		this.tl = gsap.timeline()
		.eventCallback('onComplete', () => {
			this.animating = false
			this.over && this.open()
		})
		.set(path, { attr: { d: coords.close[0] }})
		.to(path, { attr: { d: coords.close[1] }, duration: 0.85, ease: 'expo' }, 0)
		.to(path, { attr: { d: coords.close[2] }, duration: 0.85, ease: 'expo' }, 0.15)
	}

	destroy() {
		this.removeEvents()
		this.el = null
		this.tl = null
	}

	removeEvents() {
		listener(this.el, 'r', 'mouseenter', this.onEnter)
		listener(this.el, 'r', 'mouseleave', this.onLeave)		
	}
	
	addEvents() {
		listener(this.el, 'a', 'mouseenter', this.onEnter)
		listener(this.el, 'a', 'mouseleave', this.onLeave)
	}
	
	init() {
		this.addEvents()
	}
}

export default Button

