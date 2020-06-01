const express = require('express')
const postcss = require('postcss')
const sass = require('sass')
const rtlcss = require('rtlcss')
const autoprefixer = require('autoprefixer')
const { join } = require('path')

const { replaceSlash, logGulp, logError } = require('../helpers')
const browserSync = require('../browser-sync')

const { srcStyles, filesStyle } = require('../../.dirrc')

const router = express.Router()

let CACHE = {}
let LOG_CACHE = {}
let isRefreshStyleCache = false

function renderCss (filePath, isRTL) {
  return new Promise((resolve, reject) => {
    try {
      const processor = postcss()

      if (isRTL) {
        processor.use(rtlcss)
      }

      processor.use(autoprefixer)

      let css = ''

      const sassResult = sass.renderSync({
        file: filePath
      })

      css = sassResult.css

      processor
        .process(css, { from: undefined })
        .then(resolve)
        .catch(reject)
    } catch (err) {
      reject(err)
    }
  })
}

router.get(/\.css$/, async (req, res) => {
  const { path } = req
  const filePathTest = /^\/css\/(.+)\.css$/.exec(path) || []

  let filePath = filePathTest[1]

  if (!filePath) {
    res.status(404).send('')
    return
  }

  let cacheName

  try {
    const isRTL = /-rtl$/.test(filePath)

    if (isRTL) {
      filePath = /(.+)-rtl$/.exec(filePath)[1]
    }

    const sassPath = join(srcStyles, `${filePath}.scss`)

    if (isRefreshStyleCache) {
      isRefreshStyleCache = false
      CACHE = {}
      LOG_CACHE = {}
    }

    cacheName = isRTL ? `${sassPath}-rtl` : sassPath

    if (!CACHE[cacheName]) {
      CACHE[cacheName] = renderCss(sassPath, isRTL)
    }

    const result = await CACHE[cacheName]

    if (!LOG_CACHE[cacheName]) {
      LOG_CACHE[cacheName] = logGulp(`\x1b[32m${path} has been rendered successfully\x1b[0m`)
    }

    res.type('text/css').send(result.css)
  } catch (detail) {
    if (!LOG_CACHE[cacheName]) {
      LOG_CACHE[cacheName] = logError(path, detail)
    }

    res.status(500).send('')
  }
})

browserSync.observe(replaceSlash(filesStyle), () => {
  isRefreshStyleCache = true

  logGulp('STYLE(S) changed. Refreshing css ...')
  browserSync.reload('*.css')
})

module.exports = router
