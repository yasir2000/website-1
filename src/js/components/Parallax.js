import gsap from 'gsap'

import store from '../store'
import math from '../utils/math'

import EventBus from '../utils/EventBus'
import { Events as GlobalRAFEvents } from '../utils/GlobalRAF'
import { Events as GlobalResizeEvents } from '../utils/GlobalResize'

class Parallax {
  constructor(elems) {
    this.elems = elems

    this.cache = null

    this.state = {
      isResizing: false,
    }

    this.init()
  }

  run = ({ current }) => {
    this.state.current = current
    this.animateElems()
  }

  animateElems() {
    for (let i = 0; i < this.cache.length; i++ ) {
      const { height, top, bottom, tl } = this.cache[i]
      const { isVisible } = this.isVisible(top, bottom)

      if (isVisible || this.state.isResizing) {
        tl.progress(this.intersectRatio(height, top))
      }      
    }
  }

  isVisible(top, bottom) {
    const { current } = this.state

    const start = top - current
    const end = bottom - current
    const isVisible = start < store.height && end > 0

    return {
      isVisible,
      start,
      end
    }
  }

  intersectRatio = (height, top) => {
    return gsap.utils.clamp(0, 1, 1 - (-this.state.current + top + height) / (store.height + height))
  }

  getCache() {
    if (this.elems) {
      this.cache = []
      this.elems.forEach(el => {
        if ((el.dataset.animateMobile === undefined && store.isDevice) ||
          (el.dataset.animateFirefox === undefined && store.isFirefox)) return

        const tl = gsap.timeline({ paused: true })
        const from = JSON.parse(el.dataset.from)
        const to = {...JSON.parse(el.dataset.to), ...{ duration: 1, ease: 'linear' }}

        tl.fromTo(el, from, to)

        tl.progress(1)
        const { top, bottom, height } = el.getBoundingClientRect()
        tl.progress(0)

        this.cache.push({
          el: el,
          tl: tl,
          top: top > store.height ? top : store.height,
          bottom: bottom,
          height: height
        })
      })
    }
  }

  updateCache() {
    this.elems.forEach(elem => {
      const { top, bottom } = elem.getBoundingClientRect()

      Object.assign(elem, {
        top: top > store.height ? top : store.height,
        bottom: bottom,
        height: bottom - top,        
      })
    })
  }

  addListeners() {
    EventBus.on(GlobalRAFEvents.TICK, this.run)
    EventBus.on(GlobalResizeEvents.RESIZE, this.onResize)   
  }

  removeListeners() {
    EventBus.off(GlobalRAFEvents.TICK, this.run)
    EventBus.off(GlobalResizeEvents.RESIZE, this.onResize)   
  }

  onResize = () => {
    this.state.isResizing = true
    this.updateCache()
    this.state.isResizing = false
  }

  destroy() {
    this.removeListeners()

    this.cache = null
    this.elems = null
    this.state = null
  }

  init() {
    this.getCache()
    this.addListeners()
  }
}

export default Parallax