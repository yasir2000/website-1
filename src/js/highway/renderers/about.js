import DefaultRenderer from './Default'
import Partners from '../../components/Partners'

class AboutRenderer extends DefaultRenderer {
  onEnter() {
    super.onEnter()
  }
  
  onLeave() {
    super.onLeave()
  }

  onEnterCompleted() {
    super.onEnterCompleted()
    this.handlePartners()
  }

  onLeaveCompleted() {
    super.onLeaveCompleted()
    this.killPartners()
  }

  handlePartners() {
    this.partners = null
    this.partners = []
    document.querySelectorAll('.js-partner').forEach(el => {
      this.partners.push(new Partners(el))
    })
  }

  killPartners() {
    this.partners.forEach(partner => partner.destroy())
  }
}

export default AboutRenderer