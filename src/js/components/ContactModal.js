import gsap from 'gsap'
import listener from '../utils/listener'
import store from '../store'

class ContactModal {

  constructor() {
    this.el = null
    this.el = null
    this.ui = null
    this.triggers = null
    this.tl = null
    this.isOpen = false
  }

  open = (e) => {
    e.preventDefault()
    
    this.isOpen = true
    store.isLocked = true

    if (this.tl) this.tl.kill()
    this.tl = gsap.timeline()
    .to(this.el, {
      autoAlpha: 1,
      duration: 1,
      ease: 'expo'
    })
    .fromTo(this.ui.inner, {
      y: 30,
    }, {
      y: 0,
      duration: 1,
      ease: 'expo'
    }, 0)
  }

  close = () => {
    this.isOpen = false
    if (this.tl) this.tl.kill()
    this.tl = gsap.timeline({
      onComplete: () => {
        store.isLocked = false
      }
    })

    this.tl
    .to(this.el, {
      autoAlpha: 0,
      duration: 1,
      ease: 'expo'
    })
    .to(this.ui.inner, {
      y: 30,
      duration: 1,
      ease: 'expo'
    }, 0)
  }

  update() {
    this.triggers = null
    this.triggers = document.querySelectorAll('.js-open-cmodal')
    this.triggers.forEach(trigger => {
      listener(trigger, 'a', 'click', this.open)
    })
  }

  clean() {
    this.triggers.forEach(trigger => {
      listener(trigger, 'r', 'click', this.open)
    })   
  }

  onEnter = () => {
    const { close } = this.ui

    gsap.to(close, 1, {
      rotation: 135,
      duration: 1,
      ease: 'expo'
    })
  }

  onLeave = () => {
    const { close } = this.ui

    gsap.to(close, {
      rotation: 45,
      duration: 1,
      ease: 'expo'
    })
  }

  on() {
    const { close } = this.ui
    listener(close, 'a', 'click', this.close)
    listener(close, 'a', 'mouseenter', this.onEnter)
    listener(close, 'a', 'mouseleave', this.onLeave)
  }

  off() {
    const { close } = this.ui
    listener(close, 'r', 'click', this.close)
  }

  init() {
    this.el = document.querySelector('.js-cmodal')
    this.ui = {
      close: this.el.querySelector('.js-close-cmodal'),
      inner: this.el.querySelector('.js-cmodal__inner')
    }
    this.on()
  }
}

export default new ContactModal()