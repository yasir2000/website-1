class Pointer {

  constructor() {
    this.isRunning = false
    this.el = document.querySelector('.js-pe')
  }

  run() {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => {
      this.isRunning = false
      this.togglePointers('none')
    }, 300)

    if (!this.isRunning) {
      this.isRunning = true
      this.togglePointers('all')
    }
  }

  togglePointers(state) {
    this.el.style.pointerEvents = state
  }
}

export default new Pointer()