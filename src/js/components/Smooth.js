import store from '../store'

import EventBus from '../utils/EventBus'
import { Events as GlobalRAFEvents } from '../utils/GlobalRAF'
import { Events as GlobalResizeEvents } from '../utils/GlobalResize'

class Smooth {
  constructor() {
    this.el = store.scrollEl

    this.ui = {
      sections: document.querySelectorAll('.js-smooth-section'),
      skews: document.querySelectorAll('.js-skew')
    }

    this.state = {
      current: 0,
      target: 0,
      skew: 0,
      threshold: 200,
      isResizing: false,
      isH: store.isH
    }

    this.init()
  }

  init() {
    this.on()
  }

  on() {
    this.setStyles()
    this.getCache()
    this.addListeners()
  }

  setStyles() {
    store.body.classList.add('is-virtual-scroll')
  }

  run = ({ target, current }) => {
    this.state.current = current
     
    this.state.skew =+ ((target - this.state.current) / store.width) * 10

    this.transformSections()
  }

  transformSections() {
    const { isResizing } = this.state
    const total = this.sections.length

    for (let i = 0; i < total; i++) {
      const data = this.sections[i]
      const { el, bounds, speed, vertical, rotate, elems } = data
      const { isVisible, transform } = this.isVisible(bounds, speed)

      if (isVisible || isResizing) {
        data.out = false
        el.style.transform = this.getTransform(transform, vertical, rotate)
        this.skewElems(elems)
      } else if (!data.out) {
        data.out = true
        el.style.transform = this.getTransform(transform, vertical, rotate)
        this.skewElems(elems)
      }
    }
  }

  skewElems(elems) {
    if (!elems) return
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i]
      el.style.transform = `skewY(${this.state.skew}deg)`
    }
  }

  getTransform(transform, vertical, rotate) {
    const translate = vertical !== undefined
    ? `translate3d(${transform}px, 0, 0)` 
    : `translate3d(0, ${-transform}px, 0)`
    const rotation = rotate !== undefined
    ? `rotate(${transform * 0.05}deg)`
    : ''

    return translate + rotation
  }

  isVisible({ top, bottom, offset, parallaxOffset }, speed) {
    const { current, threshold } = this.state
    const translate = current * speed
    const transform = translate - parallaxOffset
    const start = (top + offset) - translate
    const end = (bottom + offset) - translate
    const isVisible = start < (threshold + store.height) && end > -threshold

    return {
      isVisible,
      transform
    }
  }

  getCache() {
    this.getSections()
  }

  getSections() {
    if (!this.ui.sections) return
    this.sections = []

    this.ui.sections.forEach((el) => {
      el.style.transform = 'translate3d(0, 0, 0)'
      
      const elems = el.querySelectorAll('.js-skew')
      if (elems) {
        elems.forEach(elem => {
          Object.assign(elem.style, {
            transform: 'skewY(0)',
            willChange: 'transform'
          })
        })
      }

      const speed = el.dataset.speed || 1
      const { top, bottom, height } = el.getBoundingClientRect()
      const centering = (store.height / 2) - (height / 2)
      const parallaxOffset = top < store.height ? 0 : ((top - centering) * speed) - (top - centering)
      const offset = (this.state.current * speed) + parallaxOffset

      const state = {
        el,
        elems,
        bounds: {
          top,
          bottom,
          offset,
          parallaxOffset
        },
        speed,
        out: true,
        vertical: el.dataset.vertical,
        rotate: el.dataset.rotate
      }

      this.sections.push(state)
    })
  }

  onResize = () => {
    this.state.isResizing = true

    if (this.sections) {
      this.sections.forEach(({ el, bounds, speed }) => {
        el.style.transform = 'translate3d(0, 0, 0)'

        const { top, bottom, height } = el.getBoundingClientRect()
        const centering = (store.height / 2) - (height / 2)
        const parallaxOffset = top < store.height ? 0 : ((top - centering) * speed) - (top - centering)
        const offset = parallaxOffset

        bounds.top = top
        bounds.bottom = bottom
        bounds.parallaxOffset = parallaxOffset
        bounds.offset = offset
      })

      this.transformSections()
    }

    this.state.isResizing = false
  }

  addListeners() {
    EventBus.on(GlobalRAFEvents.TICK, this.run)
    EventBus.on(GlobalResizeEvents.RESIZE, this.onResize)
  }

  removeListeners() {
    EventBus.off(GlobalRAFEvents.TICK, this.run)
    EventBus.off(GlobalResizeEvents.RESIZE, this.onResize)   
  }

  destroy() {
    this.removeListeners()

    this.ui = null
    this.state = null
    this.sections = null
  }
}

export default Smooth