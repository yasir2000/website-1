import gsap from 'gsap'
import GlobalRAF from '../utils/GlobalRAF'
import listener from '../utils/listener'

class Partners {
	constructor(el) {
		this.el = el

		this.DOM = {
			preview: {
				el: this.el.querySelector('.js-partner-preview'),
				name: this.el.querySelector('.js-partner-preview__name'),
				description: this.el.querySelector('.js-partner-preview__description'),
				close: this.el.querySelector('.js-partner-preview__close'),
				firstLine: this.el.querySelector('.js-partner-preview__line--first'),
				lastLine: this.el.querySelector('.js-partner-preview__line--last'),
				img: this.el.querySelector('.js-partner-preview__image'),
				mask: this.el.querySelector('.js-partner-preview__mask'),
				title: this.el.querySelector('.js-partner-preview__title')
			},
			items: [
				...this.el.querySelectorAll('.js-partner__item')
			]
		}

		this.isOpen = false
		
		this.cache = null
		this.openTL = null
		this.closeTL = null
		
		this.init()
	}
	
	getCache() {
		this.cache = []
		const { items } = this.DOM
		
		items.forEach(el => {
			const description = el.querySelector('.js-partner__item-description').dataset.description
			const name = el.querySelector('.js-partner__item-name').dataset.name
			const title = el.querySelector('.js-partner__item-title').dataset.title
			const img = el.querySelector('.js-partner__item-img').src
			const bounds = el.getBoundingClientRect()
			
			this.cache.push({
				el,
				name,
				description,
				img,
				title,
				bounds
			})
		})
	}
	
	showPreview = ({ target }) => {
		if (this.isOpen) return
		this.isOpen = true

		const { items } = this.DOM
		const item = target.closest('.js-partner__item')
		const { 
			name: itemName, 
			description: itemDesc, 
			img: itemImg,
			title: itemTitle,
		} = this.cache[items.indexOf(item)]

		const { 
			firstLine, 
			lastLine, 
			description,
			title,
			name,
			img,
			el
		} = this.DOM.preview
		
		name.textContent = itemName
		description.textContent = itemDesc
		title.textContent = itemTitle
		img.src = itemImg

		gsap.set(el, { height: 'auto' })

		items.forEach(element => {
			if (element != item) {
				gsap.to(element, {
					alpha: 0.25,
					duration: 1,
					ease: 'linear'
				})
			}
		})

		if (this.openTL) this.openTL.kill()
		this.openTL = gsap.timeline({
			onComplete: () => {
				GlobalRAF.setMaxHeight()
				GlobalRAF.clampTarget()
			}
		})

		this.openTL
		.set(el, { 
			alpha: 0 
		}, 0)
		.to(el, {
			alpha: 1,
			duration: 0.75,
			ease: 'linear'
		}, 0)
		.from(el, {
			height: 0,
			duration: 1,
			ease: 'expo.inOut'
		}, 0)
		.fromTo([firstLine, lastLine], {
			xPercent: -100,
		},{
			xPercent: 0,
			duration: 1.25,
			ease: 'expo.inOut'
		}, 0)
	}
	
	closePreview = () => {
		this.isOpen = false

		const { items, preview } = this.DOM
		const { el } = preview

		if (this.closeTl) this.closeTl.kill()
		this.closeTL = gsap.timeline({
			onComplete: () => {
				GlobalRAF.setMaxHeight()
				GlobalRAF.clampTarget()
			}
		})
		
		this.closeTL
		.to(el, {
			alpha: 0,
			duration: 1,
			ease: 'linear'
		}, 0)
		.to(el, {
			height: 0,
			duration: 1,
			ease: 'expo.inOut'
		}, 0)
		.to(items, {
			alpha: 1,
			duration: 1,
			ease: 'linear'
		}, 0)
	}
	
	addEvents() {
		const { items, preview } = this.DOM
		
		items.forEach(item => {
			listener(item, 'a', 'click', this.showPreview)
		})
		
		listener(preview.close, 'a', 'click', this.closePreview)
	}

	removeEvents() {
		const { items, preview } = this.DOM
		
		items.forEach(item => {
			listener(item, 'r', 'click', this.showPreview)
		})

		listener(preview.close, 'r', 'click', this.closePreview)		
	}

	destroy() {
		this.removeEvents()
		this.DOM = null
		this.cache = null

		if (this.openTL) {
			this.openTL.kill()
			this.openTL = null
		}

		if (this.closeTl) {
			this.closeTl.kill()
			this.closeTl = null
		}
	}
	
	init() {
		this.getCache()
		this.addEvents()
	}
}

export default Partners