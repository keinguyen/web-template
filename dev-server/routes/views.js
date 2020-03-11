const express = require('express')
const pug = require('pug')
const { join } = require('path')

const { renderErrorHTML, getAvaiableLocalesData, replaceSlash, logGulp } = require('../../tools')
const browserSync = require('../browser-sync')

const { srcViews, filesView, filesPublic, filesLocale } = require('../../.dirrc')
const pugCfg = require('../../.pugrc')

const router = express.Router()

let VIEW_CACHE = {}
let TRANSLATOR_CACHE = {}
let isRefreshViewCache = false
let isRefreshLanguageCache = false

function renderHtml (viewPath, options) {
  return new Promise((resolve, reject) => {
    pug.renderFile(viewPath, options, (err, result) => {
      if (result) {
        resolve(result)
      } else {
        reject(err.message)
      }
    })
  })
}


router.get('/', (req, res) => {
  const { DS_DEFAULT_LANGUAGE } = process.env

  let languagePath = DS_DEFAULT_LANGUAGE ? `${DS_DEFAULT_LANGUAGE}/` : ''

  res.redirect(`/${languagePath}index.html`)
})

router.get(/\.html$/, async (req, res) => {
  const { path } = req
  const { DS_LOCALES, DS_DEFAULT_LANGUAGE } = process.env

  let $translator = {}
  let $localeName = ''
  let viewPath = ''

  try {
    let filePath = ''

    if (DS_LOCALES) {
      const locales = DS_LOCALES.split(',')

      path.replace(/^[/]?([^\/]+)\/(.+)\.html$/, (match, lang, file) => {
        filePath = file
        $localeName = lang
      })

      if (!$localeName || !locales.includes($localeName)) {
        throw 'default_redirect'
      }

      if (isRefreshLanguageCache) {
        isRefreshLanguageCache = false
        TRANSLATOR_CACHE = {}
      }

      if (!TRANSLATOR_CACHE[$localeName]) {
        TRANSLATOR_CACHE[$localeName] = getAvaiableLocalesData($localeName)[$localeName]
      }

      $translator = TRANSLATOR_CACHE[$localeName] || {}
    } else {
      filePath = /^[/]?(.+)\.html$/.exec(path)[1]
    }

    viewPath = join(srcViews, `${filePath}.pug`)

    if (isRefreshViewCache) {
      isRefreshViewCache = false
      VIEW_CACHE = {}
    }

    if (!VIEW_CACHE[path]) {
      const options = {
        ...pugCfg,
        $translator,
        $localeName,
      }

      VIEW_CACHE[path] = renderHtml(viewPath, options)
    }

    const html = await VIEW_CACHE[path]

    res.type('text/html').send(html)
  } catch (err) {
    if (err === 'default_redirect') {
      res.redirect(`/${DS_DEFAULT_LANGUAGE + path}`)
    } else {
      res.status(404).send(renderErrorHTML(err))
    }
  }
})

browserSync.observe(replaceSlash(filesView), () => {
  isRefreshViewCache = true

  logGulp('PUG(S) changed. Refreshing view ...')
  browserSync.reload()
})

browserSync.observe(replaceSlash(filesLocale), () => {
  isRefreshLanguageCache = true
  isRefreshViewCache = true

  logGulp('LOCALE(S) changed. Refreshing view ...')
  browserSync.reload()
})

browserSync.observe(replaceSlash(filesPublic), () => {
  logGulp('ASSET(S) changed. Refreshing view ...')
  browserSync.reload()
})

module.exports = router
