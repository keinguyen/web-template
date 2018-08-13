const list = {
  data: [],
  totalError: 0,
  totalWarning: 0
};

function handleError ({ plugin, message, codeFrame = '' } = {}) {
  ++list.totalError;

  list.data.push({
    type: 'Error',
    plugin: plugin.toUpperCase(),
    message: message.trim(),
    code: codeFrame
  });

  typeof this.emit === 'function' && this.emit('end');
}

const handleESLintError = (results) => {
  results.forEach(({ filePath, messages } = {}) => {
    messages.forEach(({ severity, line, column, message } = {}) => {
      const isError = severity === 2;
      const type = isError ? 'Error' : 'Warning';
      const checkCount = isError ? 'totalError' : 'totalWarning';

      ++list[checkCount];

      list.data.push({
        type,
        plugin: `ES Lint ${type}`,
        message: filePath,
        code: `[${line}:${column}] ${message}`
      });
    });
  });

  return {
    error: results.errorCount,
    warning: results.warningCount
  };
};

module.exports = {
  isJSValid: true,
  list,
  handleError,
  handleESLintError
}
