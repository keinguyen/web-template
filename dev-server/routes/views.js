const { Router } = require('express')
const { join } = require('path')

const {
  compileHtml,
  renderErrorHTML,
  getAvaiableLocalesData,
  logGulp
} = require('../helpers')
const browserSync = require('../browser-sync')

const {
  srcViews,
  filesView,
  filesViewModel,
  filesAssets,
  filesLocale
} = require('../../.dirrc')

const router = Router()

let COMPILE_CACHE = {}
let VIEW_CACHE = {}
let TRANSLATOR_CACHE = {}
let isRefreshCompileCache = false
let isRefreshViewCache = false
let isRefreshLanguageCache = false

router.get('/', (req, res) => {
  const { DS_DEFAULT_LANGUAGE } = process.env

  const languagePath = DS_DEFAULT_LANGUAGE ? `${DS_DEFAULT_LANGUAGE}/` : ''

  res.redirect(`/${languagePath}index.html`)
})

router.get(/\.html$/, (req, res) => {
  const { path } = req
  const { DS_LOCALES, DS_DEFAULT_LANGUAGE } = process.env

  let $translator = {}
  let $localeName = ''
  let viewPath = ''

  try {
    let filePath = ''

    if (DS_LOCALES) {
      const locales = DS_LOCALES.split(',')

      path.replace(/^[/]?([^/]+)\/(.+)\.html$/, (match, lang, file) => {
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

    if (isRefreshCompileCache) {
      isRefreshCompileCache = false
      COMPILE_CACHE = {}
    }

    if (isRefreshViewCache) {
      isRefreshViewCache = false
      VIEW_CACHE = {}
    }

    if (!COMPILE_CACHE[path]) {
      COMPILE_CACHE[path] = compileHtml(viewPath)
    }

    if (!VIEW_CACHE[path]) {
      const variables = {
        $translator,
        $localeName
      }

      VIEW_CACHE[path] = COMPILE_CACHE[path](variables)
    }

    res.type('text/html').send(VIEW_CACHE[path])
  } catch (err) {
    if (err === 'default_redirect') {
      res.redirect(`/${DS_DEFAULT_LANGUAGE + path}`)
    } else {
      res.status(404).send(renderErrorHTML(err))
    }
  }
})

browserSync.observe([filesView, filesViewModel], () => {
  isRefreshCompileCache = true
  isRefreshViewCache = true

  logGulp('PUG(S) changed. Refreshing browser ...')
  browserSync.reload()
})

browserSync.observe(filesLocale, () => {
  isRefreshLanguageCache = true
  isRefreshViewCache = true

  logGulp('LOCALE(S) changed. Refreshing browser ...')
  browserSync.reload()
})

browserSync.observe(filesAssets, () => {
  logGulp('ASSET(S) changed. Refreshing browser ...')
  browserSync.reload()
})

module.exports = router
