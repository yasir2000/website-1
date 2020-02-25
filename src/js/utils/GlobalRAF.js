import VirtualScroll from 'virtual-scroll'
import ScrollToPlugin from 'gsap/ScrollToPlugin'

import store from '../store'
import preload from './preload'
import listener from './listener'
import Pointer from './Pointer'

import EventBus from './EventBus'
import { Events as GlobalResizeEvents } from './GlobalResize'
import gsap, { Expo } from 'gsap'

const scrollToPlugin = ScrollToPlugin

class GlobalRAF {
  constructor() {
    gsap.ticker.add(this.tick)

    this.state = {
      target: 0,
      current: 0,
      currentRounded: 0,
      ease: 0.115
    }
    this.addListeners()
  }

  setMaxHeight = () => {
    const el = store.scrollEl
    const bounds = el.getBoundingClientRect()
    const bounding = bounds.height
    const offset = store.height
    store.scrollBounding = bounding >= offset ? bounding - offset : bounding
  }

  tick = () => {
    const state = this.state
    if (store.isSmooth) {
      state.current += (state.target - state.current) * state.ease
      state.currentRounded = Math.round(state.current * 100) / 100
    } else {
      state.currentRounded = state.target
    }

    EventBus.emit(GlobalRAF.events.TICK, {
      target: state.target,
      current: state.currentRounded,
    })
  }

  clampTarget() {
    const state = this.state
    state.target = Math.min(Math.max(state.target, 0), store.scrollBounding)
  }

  onEvent = (e) => {
    if (store.isLocked) return
    Pointer.run()
    this.state.target += e.deltaY * -1
    this.clampTarget()
  }

  onScroll = () => {
    this.state.target = window.scrollY
  }

  onResize = () => {
    if (store.isSmooth) {
      this.setMaxHeight()
      this.clampTarget()
    }
  }

  update = () => {
    if (store.isSmooth) {
      const state = this.state
      state.target = state.current = state.currentRounded = 0
      this.setMaxHeight()
      preload(this.setMaxHeight)
    }
  }

  scrollTo(offset) {
    if (store.isSmooth) {
      gsap.to(this.state, {
        target: offset,
        duratioon: 1,
        ease: 'expo.inOut',
        onComplete: () => {
          this.clampTarget()
        }
      })
    } else {
      gsap.to(window, {
        scrollTo: offset,
        duratioon: 1,
        ease: 'expo.inOut'
      })
    }
  }

  addListeners() {
    if (store.isSmooth) {
      this.vs = new VirtualScroll({
        limitInertia: false,
        mouseMultiplier: store.isWindows ? 0.9 : 0.45,
        touchMultiplier: 3,
        firefoxMultiplier: store.isWindows ? 180 : 90,
        passive: true,
        keyStep: 200
      })
      this.vs.on(this.onEvent)
    } else {
      listener(window, 'a', 'scroll', this.onScroll, true)
    }
    EventBus.on(GlobalResizeEvents.RESIZE, this.onResize)

    listener(window, 'a', 'keyup', (e) => {
      if (e.keyCode === 34) {
        this.state.target = store.scrollBounding
      } else if (e.keyCode === 33) {
        this.starget.target = 0
      }
    })
  }
}

GlobalRAF.events = {
  TICK: 'TICK',
}

export default new GlobalRAF()
export const Events = GlobalRAF.events
