const express = require('express')
const webpack = require('webpack')
const { join } = require('path')
const { readFile } = require('fs')

const { srcScripts, filesScript, tmpJs } = require('../../.dirrc')
const webpackOpts = require('../../.webpackrc.dev.js')
const { replaceSlash, logGulp, logError, logWarning } = require('../helpers')
const browserSync = require('../browser-sync')

const router = express.Router()

let isRefreshScriptCache = false
let isRefreshMapCache = false
let CACHE = {}
let LOG_CACHE = {}
let MAP_CACHE = {}
const COMPILER_CACHE = {}

function renderJs (entry, filename) {
  return new Promise((resolve, reject) => {
    if (!COMPILER_CACHE[entry]) {
      COMPILER_CACHE[entry] = webpack({
        ...webpackOpts,
        entry,
        output: {
          filename,
          publicPath: '/js/',
          path: tmpJs,
          chunkFilename: '[name].js'
        }
      })
    }

    COMPILER_CACHE[entry].run((err, stats) => {
      if (err) {
        reject({
          code: 500,
          msg: err
        })

        return
      }

      const { errors, warnings } = stats.toJson('errors-warnings')

      if (errors[0]) {
        reject({
          code: 500,
          msg: errors
        })

        return
      }

      readJs(join(tmpJs, filename)).then(({ data }) => {
        resolve({
          data,
          warnings
        })
      }).catch(reject)
    })
  })
}

function readJs (path) {
  return new Promise((resolve, reject) => {
    readFile(path, (err, data) => {
      if (err) {
        reject({
          code: 404,
          msg: err
        })
      } else {
        resolve({ data })
      }
    })
  })
}

function parseProblemStrToObj (str) {
  const jsonStr = str.split('\n[{')[1]

  if (!jsonStr) {
    return str
  }

  const json = JSON.parse(`[{${jsonStr}`) || []

  return json.reduce((arr, { filePath: file, messages }) => {
    return arr.concat(messages.map(({ column, line, message }) => ({
      column,
      line,
      file,
      message
    })))
  }, [])
}

router.get(/\.js$/, async (req, res) => {
  const { path } = req
  const filePathTest = /js\/(.+\.js)$/.exec(path) || []
  const filePath = filePathTest[1]
  const isChunkFile = /chunks\//.test(filePath)

  if (isRefreshScriptCache) {
    isRefreshScriptCache = false
    CACHE = {}
    LOG_CACHE = {}
  }

  try {
    if (!filePath) {
      throw new Error({
        code: 404,
        msg: ''
      })
    }

    if (!CACHE[filePath]) {
      CACHE[filePath] = isChunkFile
        ? readJs(join(tmpJs, filePath))
        : renderJs(join(srcScripts, filePath), filePath)
    }

    const { data, warnings } = await CACHE[filePath]

    if (warnings && warnings[0]) {
      warnings.forEach((msg) => {
        parseProblemStrToObj(msg).forEach((obj) => {
          logWarning(path, obj)
        })
      })
    }

    if (!LOG_CACHE[filePath] && !isChunkFile) {
      LOG_CACHE[filePath] = logGulp(`\x1b[32m${path} has been rendered successfully\x1b[0m`)
    }

    res.type('application/javascript').send(data)
  } catch (err) {
    const code = err.code || 404
    const messages = err.msg || []

    if (messages[0] && !LOG_CACHE[filePath]) {
      messages.forEach((msg) => {
        parseProblemStrToObj(msg).forEach((obj) => {
          logError(path, obj)
        })
      })

      LOG_CACHE[filePath] = true
      CACHE[filePath] = false
    }

    res.status(code).send('')
  }
})

router.get(/\.js\.map$/, async (req, res) => {
  if (isRefreshMapCache) {
    isRefreshMapCache = false
    MAP_CACHE = {}
  }

  try {
    const { path } = req
    const filePathTest = /js\/(.+\.js\.map)$/.exec(path) || []
    const filePath = filePathTest[1] || ''

    if (!MAP_CACHE[filePath]) {
      MAP_CACHE[filePath] = readJs(join(tmpJs, filePath))
    }

    const { data } = await MAP_CACHE[filePath]

    res.type('application/octet-stream').send(data)
  } catch (err) {
    res.status(404).send(err)
  }
})

browserSync.watch(replaceSlash(filesScript)).on('change', () => {
  isRefreshScriptCache = true
  isRefreshMapCache = true

  browserSync.reload()

  logGulp('SCRIPT(S) changed. Refreshing browser ...')
})

module.exports = router
