const list = {
  data: [],
  totalError: 0,
  totalWarning: 0
};

const handleError = ({ plugin, message, codeFrame = '' } = {}) => {
  ++list.totalError;

  list.data.push({
    type: 'Error',
    plugin: plugin.toUpperCase(),
    message: message.trim(),
    code: codeFrame
  });

  typeof this.emit === 'function' && this.emit('end');
};

const handleESLintError = (results) => {
  if (results.errorCount === 0 && results.warningCount === 0) {
    return true;
  }

  results.forEach(({ filePath, messages } = {}) => {
    messages.forEach(({ severity, line, column, source, message } = {}) => {
      const isError = severity === 2;
      const type = isError ? 'Error' : 'Warning';
      const checkCount = isError ? 'totalError' : 'totalWarning';

      ++list[checkCount];

      list.data.push({
        type,
        plugin: `ES Lint ${type}`,
        message: filePath,
        code: `[${line}:${column}]  ${source.trim()}\n |  ${message}`
      });
    });
  });

  return false;
};

module.exports = {
  isJSValid: true,
  list,
  handleError,
  handleESLintError
}
