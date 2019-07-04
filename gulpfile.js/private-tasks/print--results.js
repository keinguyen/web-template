const notify = require('gulp-notify');
const stripIndent = require('strip-indent');

const { pluralText } = require('../utils');
const errors = require('../utils/errors');
const { log } = console;

notify.logLevel(0);

function printResults (cb) {
  const errList = errors.list;
  const { totalError, totalWarning, totalIssue, data } = errList;
  const errorString = `${totalError} ${pluralText('error', totalError)}`;
  const warningString = `${totalWarning} ${pluralText('warning', totalWarning)}`;
  const resultString = `The project has ${errorString} & ${warningString}`;
  const resultStr = resultString; // Improve Performance Node
  const dashChar = ''.padEnd(resultStr.length + 4, '=');

  log(stripIndent(`
    ${dashChar}

      ${resultStr}

    ${dashChar}
  `));

  if (!totalIssue) {
    return cb();
  }

  const infoLogs = stripIndent(data.map(({ message, code, title, type }, i) => {
    if (type !== 'Warning') {
      notify.onError({
        title,
        message
      }).apply(this, arguments);
    }

    return `
    ---[ ${type} ${i + 1} ]-------------------------
    |  Path : ${message}
    |  ${code}
    `;
  }).join(`
  `));

  log((`
  ${infoLogs}
  ${dashChar}
  `).replace(/^ {2}/gm, ''));

  errors.resetError();

  return cb();
}

printResults.displayName = 'print:results';

module.exports = printResults;
