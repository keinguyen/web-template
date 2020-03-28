const CACHES = {}

function getScript (src, forceCache = false) {
  if (!src) {
    return new Promise()
  }
  const script = document.createElement('script')

  script.src = src
}
