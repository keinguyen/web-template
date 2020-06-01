const express = require('express')
const del = require('del')

const browserSync = require('./browser-sync')
const { logGulp, getAvaiableLocales } = require('./helpers')

const { assets, tmp } = require('../.dirrc')
const browserSyncCfg = require('../.bsrc')

// __________________________________________
//                  CHECKING SERVER LANGUAGES
logGulp('Checking available locales')

const locales = getAvaiableLocales()

let { defaultLanguage, serverPort, port } = browserSyncCfg

if (locales[0]) {
  defaultLanguage = ~locales.indexOf(defaultLanguage) ? defaultLanguage : locales[0]

  logGulp('Dev server will run in', '\x1b[33m', 'multi languages', '\x1b[0m', 'mode')
  logGulp('Available languages:', '\x1b[32m', locales.join(', '), '\x1b[0m')
  logGulp('Default Language:', '\x1b[32m', defaultLanguage, '\x1b[0m')
} else {
  defaultLanguage = ''

  logGulp('Dev server will run in', '\x1b[33m', 'single language', '\x1b[0m', 'mode')
}

process.env.DS_LOCALES = locales.join(',')
process.env.DS_DEFAULT_LANGUAGE = defaultLanguage

// __________________________________________
//                          TWEAK SERVER EXIT
process.on('exit', () => {
  logGulp('Clean temp files')
  del.sync(tmp)
})

process.on('SIGINT', () => {
  process.exit()
})

// __________________________________________
//                               START SERVER
const app = express()
const routes = require('./routes')

app.use(express.static(assets))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use('/', routes)

app.listen(serverPort, () => {
  browserSync.init(browserSyncCfg, () => {
    process.env.DS_STARTED = true
    logGulp(`Dev server is running at http://localhost:${port}`)
  })
})
