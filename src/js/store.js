import sniffer from 'sniffer'

const store = {
  body: document.body,
  height: window.innerHeight,
  width: window.innerWidth,
  scrollBounding: 0,
  scrollEl: document.querySelector('.js-smooth'),
  head: document.querySelector('.js-site-head'),
  isScrolled: false,
  isLocked: false,
  isActive: false,
  isHighway: false,
  isWindows: (["Win32", "Win64", "Windows", "WinCE"].indexOf(window.navigator.platform) !== -1),
  isOpen: false,
  page: {
    current: null,
    last: null
  }
}

Object.assign(store, sniffer.getInfos())
Object.assign(store, {
  isSmooth: store.isDesktop
})

export default store