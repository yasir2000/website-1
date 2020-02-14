import listener from './listener'
import store from '../store'

function loadImage(url) {
  return new Promise(resolve => {
    const img = document.createElement('img')
    listener(img, 'a', 'load', () => {
      resolve(img)
    })
    listener(img, 'a', 'error', () => {
      resolve()
    })
    img.src = url
  })
}

const preload = async (cb) => {
  const images = [...store.scrollEl.querySelectorAll('img')]
  const imagePromises = images.map(async img => {
    await loadImage(img.src)
  })
  await Promise.all(imagePromises)
  cb()
}

export default preload