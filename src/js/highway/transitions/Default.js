import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import store from '../../store'
import SplitText from '../../vendor/SplitText'
import loadImages from '../../utils/loadImages'
import Gltransition from '../../gl/Gltransition'

let tl

class DefaultTransition extends Highway.Transition {
  in({ from, to, done }) {
    store.body.style.cursor = 'default'
    store.isTransition = false

    const lines = document.querySelectorAll('.js-intro-line')
    const staggerLines = document.querySelectorAll('.js-stagger-line')
    const fades = document.querySelectorAll('.js-t-fade')

    if (lines) {
      this.lines = []
      lines.forEach(line => {
        const split = new SplitText(line, { type: 'words, chars' })
        this.lines.push(split)
      })
    }

    if (tl) tl.kill()
    tl = gsap.timeline({ paused: true })
    
    if (fades) {
      tl
      .from(fades, {
        alpha: 0,
        y: 60,
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo'
      }, 0)
    }

    if (this.lines) {
      this.lines.forEach(split => {
        tl.from(split.chars, {
          yPercent: -150,
          duration: 1.5,
          stagger: 0.05,
          ease: 'expo'
        }, 0.25)
      })
    }

    loadImages(to).then(() => {
      Gltransition.in()
      tl.play()
    })
  
    from.remove()
    done()
  }

  out({ done }) {
    store.body.style.cursor = 'progress'
    store.isTransition = true
    Gltransition.out(done)
  }
}

export default DefaultTransition