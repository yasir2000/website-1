import gsap from 'gsap'
import store from '../store'
import listener from '../utils/listener'

class Menu {
	constructor() {
		this.el = document.querySelector('.js-site-nav')

		this.dom = {
			trigger: document.querySelector('.js-site-head__toggle'),
			close: this.el.querySelector('.js-site-nav__close'),
			contact: this.el.querySelector('.js-site-nav__contact'),
			inner: this.el.querySelector('.js-site-nav__inner'),
			links: [
				...this.el.querySelectorAll('.js-site-nav__link')
			],
		}

		this.tl = null

		this.init()
	}

	createTimeline() {
		this.tl = gsap.timeline({ 
			paused: true,
			defaults: {
				duration: 1
			}
		})

		const { inner, links, close, contact } = this.dom

		this.tl
		.set(close, {
			scale: 0
		}, 0)
		.to(this.el, {
			autoAlpha: 1,
			duration: 0.5
		}, 0)
		.from(inner, 1, {
			xPercent: 100,
			ease: 'expo.inOut'
		}, 0)
		.from(contact, {
			yPercent: 100,
			alpha: 0,
			ease: 'expo'
		}, 0.75)
		.to(close, {
			scale: 1,
			ease: 'expo'
		}, 0.75)
		.from(links, {
			yPercent: -100,
			stagger: 0.05,
			ease: 'expo'
		}, 0.75)
	}

	open() {
		store.isOpen = true
		this.tl.play()
	}

	close = () => {
		store.isOpen = false
		this.tl.reverse()
	}

	closeLinks = () => {
		store.isOpen = false

		gsap.to(this.el, {
			autoAlpha: 0,
			duration: 1,
			ease: 'expo',
		})

		this.tl.restart().pause()
	}

	addEvents() {
		const { trigger, close, links } = this.dom

		listener(trigger, 'a', 'click', () => {
			if (store.isOpen) {
				this.close()
			} else {
				this.open()
			}
		})

		links.forEach(el => {
			listener(el, 'a', 'click', this.closeLinks)
		})

		listener(close, 'a', 'click', this.close)

	}

	init() {
		this.addEvents()
		this.createTimeline()
	}
}
export default Menu