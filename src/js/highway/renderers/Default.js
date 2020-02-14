import Highway from '@dogstudio/highway'
import store from '../../store'
import GlobalRAF from '../../utils/GlobalRAF'
import Smooth from '../../components/Smooth'
import Parallax from '../../components/Parallax'
import ContactModal from '../../components/ContactModal'
import Button from '../../components/Button'
import ScrollAnimations from '../../components/ScrollAnimations'
import listener from '../../utils/listener'
import { qs, qsa } from '../../utils/selector'

class DefaultRenderer extends Highway.Renderer {
  onEnter() {
    this.el = this.wrap.lastElementChild
    store.page.last = store.page.current
    store.page.current = this.el.dataset.routerView

    store.page.last && store.body.classList.remove(`is-${store.page.last}`)
    store.page.current && store.body.classList.add(`is-${store.page.current}`)
  }
  
  onLeave() {
    ContactModal.clean()
  }

  onEnterCompleted() {
    this.init()
    ContactModal.update()
  }

  onLeaveCompleted() {
    if (this.smooth) this.smooth.destroy()

    if (this.buttons) {
      this.buttons.forEach(btn => btn.destroy())
    }
  }

  // Custom methods
  init() {
    GlobalRAF.update()
    if (store.isSmooth) {
      this.initSmooth()
    }
    
    if (!Highway.initialLoad) {
      Highway.initialLoad = true
    } else if (Highway.initialLoad) {
			const svg = qs('.js-svg', this.el)
			svg && svg.remove()
      store.isHighway = true
    }

    if (document.readyState === 'complete') {
      this.initParallax()
      this.initScrollAnimations()
    } else {
      listener(window, 'a', 'load', () => {
        this.initParallax()
        this.initScrollAnimations()
      })
    }

    this.initButtons()
  }

  initScrollAnimations() {
    const elems = qsa('[data-scroll]', this.el)

    if (elems) {
      this.scrollAnimation = new ScrollAnimations(elems)
    }    
  }

  initSmooth() {
    const sections = qsa('.js-smooth-section')

    if (sections) {
      this.smooth = new Smooth(sections)
    }
  }

  initParallax() {
    const elems = qsa('.js-parallax')
    
    if (elems) {
      this.parallax = new Parallax(elems)
    }
  }

  initButtons() {
    const buttons = qsa('.js-btn')
    this.buttons = []

    if (buttons) {
      buttons.forEach(el => {
        this.buttons.push(new Button(el))
      })
    }
  }
}

export default DefaultRenderer