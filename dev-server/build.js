const { logGulp, getAvaiableLocales } = require('./helpers')
const buildViews = require('./builder/views')

const locales = getAvaiableLocales()

if (locales[0]) {
  logGulp('Build process will run in', '\x1b[33m', 'multi languages', '\x1b[0m', 'mode')
  logGulp('Available languages:', '\x1b[32m', locales.join(', '), '\x1b[0m')
} else {
  logGulp('Build process will run in', '\x1b[33m', 'single language', '\x1b[0m', 'mode')
}

process.env.DS_LOCALES = locales.join(',')

buildViews()
