/**
 * SCSS
 */
import '../css/app.scss'

/**
 * SVG
 */
const __svg__ = {
  path: '../img/svg/**/*.svg',
  name: '../dist/app.bundle.svg'
}

import "regenerator-runtime/runtime"

import sniffer from 'sniffer'

import store from './store'
import listener from './utils/listener'
import GlobalRAF from './utils/GlobalRAF'
import H from './highway/index'
import ContactModal from './components/ContactModal'
import Button from './components/Button'
import Menu from './components/Menu'
import Intro from './components/Intro'

class App {
  constructor() {
    this.setup()
    this.init()
  }

  setup = () => {
    sniffer.addClasses(store.body)
    listener(window, 'a', 'load', this.onLoad)

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  onLoad = () => {
    GlobalRAF.update()
    Intro.tl.play()
  }

  init() {
    Intro.init()
    this.highwayEvents()
    this.initButtons()
    new Menu()
    ContactModal.init()
  }

  initButtons() {
    const buttons = document.querySelectorAll('.js-outer-btn')
    buttons.forEach(el => new Button(el))
  }

  highwayEvents() {
    H.on('NAVIGATE_IN', ({ location }) => {
      window.scrollTo(0, 0)

      const links = document.querySelectorAll('.js-site-link')
      if (links) {
        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          link.classList.remove('is-active');

          if (link.href === location.href) {
            link.classList.add('is-active');
          }
        }
      }
    })
  }
}

new App()
