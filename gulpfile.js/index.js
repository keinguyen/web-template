// const { log, getAvaiableLocales } = require('../tools')
// const cleanDev = require('./private-tasks/clean--dev')

// log('Checking languages')

// const locales = getAvaiableLocales()

// if (locales[0]) {
//   log('Boilerplate is running in multi languages mode')
//   log('Available languages:', '\x1b[33m', locales.join(', '), '\x1b[0m')
// } else {
//   log('Boilerplate is running in single language mode')
// }

// process.env.LOCALES = JSON.stringify(locales)

// process.on('exit', () => {
//   log('Starting', '\x1b[36m', 'clean:dev', '\x1b[0m', '...')
//   cleanDev(true)
//   log('Finished', '\x1b[36m', 'clean:dev', '\x1b[0m')
// })

// process.on('SIGINT', () => {
//   process.exit()
// })

// const requireDir = require('require-dir')
// const tasks = requireDir('./tasks')

// module.exports = tasks
