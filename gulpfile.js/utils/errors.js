const cached = require('gulp-cached')

const list = {
  get totalIssue () {
    return this.totalError + this.totalWarning
  }
}
exports.list = list

function pushError (info) {
  list.data.push(info)
  list[info.type === 'Error' ? 'totalError' : 'totalWarning']++
}

exports.handleError = function ({ plugin, message, codeFrame = '' } = {}) {
  pushError({
    type: 'Error',
    plugin: plugin.toUpperCase(),
    message: message.trim(),
    code: codeFrame
  })

  if (typeof this.emit === 'function') {
    this.emit('end')
  } else if (typeof this === 'function') {
    this()
  }
}

exports.handleESLintError = (results) => {
  results.forEach(({ filePath, messages } = {}) => {
    messages.forEach(({ severity, line, column, message } = {}) => {
      const type = severity === 2 ? 'Error' : 'Warning'

      pushError({
        type,
        plugin: `ES Lint ${type}`,
        message: filePath,
        code: `[${line}:${column}] ${message}`
      })
    })
  })

  list.isJSValid = !results.errorCount

  if (results.errorCount || results.warningCount) {
    delete cached.caches.eslint
  }
}

function resetError () {
  list.data = []
  list.totalError = 0
  list.totalWarning = 0
  list.isJSValid = true
}
exports.resetError = resetError

resetError()
