import gsap from 'gsap'

import store from '../store'
import SplitText from '../vendor/SplitText'

class ScrollAnimations {

  constructor(elems) {
    this.el = store.body
    this.elems = elems

    this.cache = null
    this.options = null
    this.observer = null

    this.init()
  }
  
  createObserver() {
    this.options = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: [0, 0]
    }
    this.observer = new IntersectionObserver(this.handler.bind(this), this.options)
  }

  fixArray() {
    this.elems = []
    const elems = [...this.el.querySelectorAll('[data-scroll]')]
    if (!elems) return
    elems.forEach(el => {
      const top = el.getBoundingClientRect().top
      if (top >= store.height) {
        this.elems.push(el)
      }
    })
  }
  
  getCache() {
    this.cache = []
    this.elems.forEach((el, index) => {
      const elem = {
        el: el,
        animation: el.dataset.scroll,
        isIntersected: false,
        elems: null,
        split: null,
        tl: null
      }
      this.cache.push(elem)
    })
  }
  
  setAnimation(elem) {
    const { el, animation } = elem

    elem.tl = gsap.timeline({ 
      paused: true, 
      immediateRender: true 
    })

    if (animation === 'staggerLines') {
      const split = new SplitText(el, { type: 'lines' })

      elem.tl
      .from(split.lines, {
        y: 45,
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo'
      }, 0)
      .from(split.lines,  {
        alpha: 0,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power1'
      }, 0)

    } else if (animation === 'stagger') {
      const elems = el.querySelectorAll('.js-stagger')

      elem.tl
      .from(elems,  {
        y: 60,
        duration: 1.5,
        stagger: 0.2,
        ease: 'expo'
      }, 0)
      .from(elems,  {
        alpha: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power1'
      }, 0)

    } else {

      elem.tl
      .from(el, 1.5, {
        y: 60,
        duration: 1.5,
        ease: 'expo'
      }, 0)
      .from(el, {
        alpha: 0,
        duration: 1.5,
        ease: 'power1'
      }, 0)

    }

    elem.tl.progress(1).progress(0)
  }
  
  handler(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let i = this.elems.indexOf(entry.target)
        let elem = this.cache[i]

        elem.isIntersected = true
        elem.tl.play()

        this.stillObserving() ? this.observer.unobserve(entry.target) : this.observer.disconnect()
      } else {
        return
      }
    })
  }
  
  stillObserving() {
    return this.cache.some(e => !e.isIntersected)
  }

  destroy() {
    this.cache = null
    this.observer.disconnect()
    this.observer = null
    this.elems = null
  }
  
  run() {
    this.cache.forEach(elem => {
      this.setAnimation(elem)
      this.observer.observe(elem.el)
    })
  }
  
  init() {
    this.fixArray()
    this.getCache()
    this.createObserver()
    this.run()
  }
}

export default ScrollAnimations