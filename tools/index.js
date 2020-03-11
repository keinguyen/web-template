const requireDir = require('require-dir')

const { srcLocales } = require('../.dirrc')

function parse2digits (value) {
  return +value < 10 ? `0${value}` : value
}

function getTime () {
  const now = new Date()
  const h = parse2digits(now.getHours())
  const m = parse2digits(now.getMinutes())
  const s = parse2digits(now.getSeconds())

  return `${h}:${m}:${s}`
}

exports.logGulp = (...arg) => {
  const logger = [
    '[\x1b[90m%s\x1b[0m] %s',
    `${getTime()}`,
    ...arg
  ]

  console.log(...logger)

  return logger
}

const logFormatter = `
{{time}} \x1b[91m{{path}} has a problem\x1b[0m
           \x1b[35mSource:\x1b[0m \x1b[33m{{file}}:{{line}}:{{column}}\x1b[0m
           \x1b[35mReason:\x1b[0m \x1b[91m{{message}}\x1b[0m
`

exports.logError = (path, err) => {
  if (!err) {
    console.log('Nothing to log')
    return
  }

  const { column, line, file, message } = err
  const detail = logFormatter
    .replace(/{{time}}/g, `[\x1b[90m${getTime()}\x1b[0m]`)
    .replace(/{{path}}/g, path)
    .replace(/{{file}}/g, file)
    .replace(/{{column}}/g, column)
    .replace(/{{line}}/g, line)
    .replace(/{{message}}/g, message.replace(/\n/g, '\n          '))

  console.log(detail)

  return detail
}

function getDetailLocalesData () {
  let data = {}

  try {
    data = requireDir(srcLocales, {
      noCache: true,
      recurse: true,
      extensions: ['.json']
    })
  } catch (err) {}

  return data
}

exports.getAvaiableLocales = () => {
  const data = getDetailLocalesData()
  const locales = Object.keys(data).filter((key) => Object.keys(data[key])[0])

  return locales
}

exports.getAvaiableLocalesData = (locale) => {
  const data = getDetailLocalesData()
  const localesData = Object.keys(data).reduce((obj, key) => {
    const langData = data[key]
    const langDataKeys = Object.keys(langData)

    if (!langDataKeys[0] || (locale && locale !== key)) {
      return obj
    }

    obj[key] = langDataKeys.reduce((data, key) => {
      return {...data, ...langData[key]}
    }, {})

    return obj
  }, {})

  return localesData
}

exports.renderErrorHTML = (msg) => `
  <body>
    <style>
      html {
        background-color: #000;
        color: #fff;
        font-family: monospace;
      }
    </style>
    <pre>${msg}</pre>
  </body>
`

exports.replaceSlash = (path) => {
  return path.replace(/\\/g, '/')
}
