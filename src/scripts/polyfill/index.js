import { safeRun } from '../helpers'
import { error, log } from '../helpers/logger'

// Get these names in https://polyfill.io/v3/url-builder/
const LIST = [
  'Promise',
  'Function.name',
  'HTMLPictureElement'
]

export default function (callback) {
  const script = document.createElement('script')

  script.src = `https://polyfill.io/v3/polyfill.min.js?features=${LIST.join('%2C')}`
  script.async = true

  script.addEventListener('load', () => {
    log('Polyfill has been loaded')
    safeRun(callback)
  })

  script.addEventListener('error', () => {
    error('Polyfill cannot be loaded')
    safeRun(callback)
  })

  document.head.appendChild(script)
}
