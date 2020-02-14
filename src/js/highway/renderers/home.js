import Highway from '@dogstudio/highway'
import DefaultRenderer from './Default'
import LottieAnis from '../../components/LottieAnis'

export default class extends DefaultRenderer {
	onEnter() {
		super.onEnter()
	}

	onEnterCompleted() {
		super.onEnterCompleted()
		this.lottieAnis = new LottieAnis()
	}
}