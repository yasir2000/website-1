export default function loadImages(el = document.body) {
  const paths = [...el.querySelectorAll('img')].map(image => image.src)
  return Promise.all(paths.map(checkImage))
}

const checkImage = path => new Promise(resolve => {
  const img = new Image()
  img.onload = () => resolve({ path, status: 'ok' })
  img.onerror = () => resolve({ path, status: 'error' })

  img.src = path
})