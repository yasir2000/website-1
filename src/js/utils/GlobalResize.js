import debounce from 'lodash.debounce'

import store from '../store'
import listener from './listener'
import EventBus from './EventBus'

class GlobalResize {
  constructor() {
    this.onResize()

    listener(window, 'a', 'resize', debounce(this.onResize, 200))
  }

  onResize = () => {
    this.updateStore()
    this.setAspect()

    EventBus.emit(GlobalResize.events.RESIZE)
  }

  updateStore() {
    Object.assign(store, { 
      width: window.innerWidth, 
      height: window.innerHeight 
    })    
  }

  setAspect() {
    if (store.height <= store.width) {
      store.body.classList.remove('is-portrait')
      store.body.classList.add('is-landscape')

      Object.assign(store, {
        isLandscape: true
      })

    } else {
      store.body.classList.remove('is-landscape')
      store.body.classList.add('is-portrait')

      Object.assign(store, {
        isLandscape: false
      })   
    }
  }
}

GlobalResize.events = {
  RESIZE: 'GlobalResize.events.RESIZE',
}

export default new GlobalResize()
export const Events = GlobalResize.events
