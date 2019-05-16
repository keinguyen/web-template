const list = {
  get totalIssue () {
    return this.totalError + this.totalWarning;
  }
};

function pushError (info) {
  list.data.push(info);
  list[info.type === 'Error' ? 'totalError' : 'totalWarning']++;
}

function handleError ({ plugin, message, codeFrame = '' } = {}) {
  pushError({
    type: 'Error',
    plugin: plugin.toUpperCase(),
    message: message.trim(),
    code: codeFrame
  });

  typeof this.emit === 'function' && this.emit('end');
}

function handleESLintError (results) {
  results.forEach(({ filePath, messages } = {}) => {
    messages.forEach(({ severity, line, column, message } = {}) => {
      const type = severity === 2 ? 'Error' : 'Warning';

      pushError({
        type,
        plugin: `ES Lint ${type}`,
        message: filePath,
        code: `[${line}:${column}] ${message}`
      })
    });
  });

  return {
    error: results.errorCount,
    warning: results.warningCount
  };
}

function resetError () {
  list.data = [];
  list.totalError = 0;
  list.totalWarning = 0;
  list.isJSValid = true;
}

resetError();

module.exports = {
  list,
  handleError,
  handleESLintError,
  resetError
};