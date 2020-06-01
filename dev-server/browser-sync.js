const browserSync = require('browser-sync')
const browserSyncInstance = browserSync.create()

const observeTimeout = {}

browserSyncInstance.observe = (path, fn) => {
  browserSyncInstance.watch(path, (...arg) => {
    if (process.env.DS_STARTED) {
      clearTimeout(observeTimeout[path])
      observeTimeout[path] = setTimeout(() => {
        fn(...arg)
      })
    }
  })
}

module.exports = browserSyncInstance
