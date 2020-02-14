import lottie from 'lottie-web'

import store from '../store'

export default class {

  constructor() {
    this.el = store.body
    this.elems = [...document.querySelectorAll('.js-bm')]

    this.animations = null
    this.options = null
    this.observer = null

    this.init()
  }
  
  createObserver() {
    this.observer = new IntersectionObserver(this.handler, {
      root: null,
      rootMargin: '0px 0px -30% 0px',
      threshold: [0, 0]
    })
  }
  
  setAnimations() {
    this.animations = []
    this.elems.forEach(el => {
      this.animations.push({
        animation: lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          path: `/static/lottie/${el.dataset.name}/data.json`
        }),
        isIntersected: false
      })
    })
  }
  
  handler = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let i = this.elems.indexOf(entry.target)
        let obj = this.animations[i]

        obj.isIntersected = true
        obj.animation.play()

        this.stillObserving() ? this.observer.unobserve(entry.target) : this.observer.disconnect()
      } else {
        return
      }
    })
  }
  
  stillObserving() {
    return this.animations.some(e => !e.isIntersected)
  }

  destroy() {
    this.animations.forEach(e => e.animation.destroy())
    this.observer.disconnect()
    this.observer = null
    this.elems = null
  }
  
  run() {
    this.elems.forEach(el => this.observer.observe(el))
  }
  
  init() {
    this.setAnimations()
    this.createObserver()
    this.run()
  }
}