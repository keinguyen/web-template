const express = require('express')
const webpack = require('webpack')
const { join } = require('path')
const { readFile } = require('fs')

const { srcScripts, tmpJs } = require('../../.dirrc')
const webpackOpts = require('../../.webpackrc.dev.js')
// const { joinSlash, logError } = require('../../tools')
// const browserSync = require('../browser-sync')

const router = express.Router()

// let isReloading = false
// let cache = {}

router.get(/\.js$/, (req, res) => {
  const filePathTest = /js\/(.+\.js)$/.exec(req.path) || []
  const filePath = filePathTest[1]

  if (filePath) {
    const jsFilePath = join(srcScripts, filePath)

    webpack({
      ...webpackOpts,
      entry: jsFilePath
    }, (err, stats) => {
      if (err) {
        debugger
        return
      }

      const data = stats.toJson('errors-warnings')

      if (data.errors && data.errors[0]) {
        debugger
        return
      }

      readFile(join(tmpJs, filePath), (err, data) => {
        if (err) {
          debugger
          return
        }

        res.type('application/javascript').send(data)
      })
    })
  } else {
    res.status(404)
  }
})

// browserSync.watch(joinSlash(srcStyles, '**/*.scss')).on('change', () => {
//   isReloading = true
//   browserSync.reload('*.css')
// })

module.exports = router
