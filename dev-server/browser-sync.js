const browserSync = require('browser-sync')
const { replaceSlash } = require('./helpers')

const browserSyncInstance = browserSync.create()

const observeTimeout = {}

browserSyncInstance.observe = (paths, fn) => {
  const pattern = [].concat(paths || []).map(path => replaceSlash(path))

  browserSyncInstance.watch(pattern, (...arg) => {
    if (process.env.DS_STARTED) {
      clearTimeout(observeTimeout[pattern])
      observeTimeout[pattern] = setTimeout(() => fn(...arg))
    }
  })
}

module.exports = browserSyncInstance
