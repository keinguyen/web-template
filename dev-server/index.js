const express = require('express')
const del = require('del')

const browserSync = require('./browser-sync')
const { logGulp, getAvaiableLocales } = require('../tools')

const { public, tmp } = require('../.dirrc')
const browserSyncCfg = require('../.bsrc')

logGulp('Checking available locales')

const locales = getAvaiableLocales()

let { defaultLanguage, serverPort, port } = browserSyncCfg

if (locales[0]) {
  defaultLanguage = ~locales.indexOf(defaultLanguage) ? defaultLanguage : locales[0]

  logGulp('Dev server will run in multi languages mode')
  logGulp('Available languages:', '\x1b[33m', locales.join(', '), '\x1b[0m')
  logGulp('Default Language:', '\x1b[33m', defaultLanguage, '\x1b[0m')
} else {
  defaultLanguage = ''

  logGulp('Dev server will run in single language mode')
}

process.env.DS_LOCALES = locales.join(',')
process.env.DS_DEFAULT_LANGUAGE = defaultLanguage

process.on('exit', () => {
  logGulp('Clean temp files')
  del.sync(tmp)
})

process.on('SIGINT', () => {
  process.exit()
})

const app = express()
const routes = require('./routes')

app.use(express['static'](public))
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
app.use('/', routes)

app.listen(serverPort, () => {
  browserSync.init(browserSyncCfg, () => {
    logGulp(`Dev server is running at http://localhost:${port}`)
  })
})
