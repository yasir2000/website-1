import gsap from 'gsap'

import SplitText from '../vendor/SplitText'
import Gltransition from '../gl/Gltransition'

class Intro {

  constructor() {
    this.fades = document.querySelectorAll('.js-t-fade')
    this.lines = null
    this.tl = null
  }

  split() {
    const lines = document.querySelectorAll('.js-intro-line')
    if (lines) {
      this.lines = []
      lines.forEach(line => {
        const split = new SplitText(line, { type: 'words, chars' })
        this.lines.push(split)
      })
    }
  }

  createTl() {
    this.tl = gsap.timeline({ 
      paused: true,
      onStart: () => Gltransition.intro()
    })

    const home = location.pathname === '/'

    if (home) {
      this.tl
      .set('.js-i-4', {
        transformOrigin: 'center'
      })
      .from('.js-i-1', {
        scale: 2,
        duration: 3,
        ease: 'expo'
      }, 0.75)
      .from('.js-i-2', {
        scale: 1.75,
        yPercent: -5,
        duration: 3,
        ease: 'expo'
      }, 0.75)
      .from('.js-i-3', {
        scale: 1.5,
        yPercent: -10,
        duration: 3,
        ease: 'expo'
      }, 0.75)
      .from('.js-i-4', {
        scale: 1.5,
        duration: 3,
        ease: 'expo'
      }, 0.75)   
      
			this.lines.forEach(split => {
				this.tl
				.from(split.chars, {
					yPercent: -105,
					duration: 1.5,
					stagger: 0.05,
					ease: 'expo'
				}, 1.15)
			})
    }

    if (this.fades) {
      this.tl
      .from(this.fades, {
        alpha: 0,
        y: 60,
        duration: 1.5,
        stagger: 0.1,
        ease: 'expo'
      }, 0)
    }
  }

  init() {
    this.split()
    this.createTl()
  }
}

export default new Intro()