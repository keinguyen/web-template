import './initializations/update-js-assets-path'

const isIE = document.documentElement.classList.contains('ie')

async function initJS () {
  if (isIE) {
    await import(/* webpackChunkName: "chunks/ie-polyfill" */ './polyfill/ie')
  }

  import(/* webpackChunkName: "chunks/apps" */ './main/index')
}

if (isIE) {
  const script = document.createElement('script')

  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/es6-promise/4.1.1/es6-promise.auto.min.js'
  script.onload = initJS

  document.head.appendChild(script)
} else {
  initJS()
}
