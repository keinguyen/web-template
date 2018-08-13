const gulp = require('gulp');
const notify = require('gulp-notify');
const yargs = require('yargs');

const {
  env
} = yargs.argv;

const isDeveloping = env === 'dev';

const log = console.log;
const errors = require('../utils/errors');

notify.logLevel(0);

gulp.task('print:results', (cb) => {
  const errList = errors.list;
  const baseString = 'The project has';
  const errorLength = errList.totalError;
  const errorString = `${errorLength} error${errorLength > 1 ? 's' : ''}`;
  const warningLength = errList.totalWarning;
  const warningString = `${warningLength} warning${warningLength > 1 ? 's' : ''}`;
  const resultString = `${baseString} ${errorString} & ${warningString}`;
  const resultStr = resultString; // Improve Performance Node
  const totalResult = errorLength + warningLength;

  let countStringLength = resultStr.length;
  let dashChar = '==';

  while (countStringLength--) {
    dashChar+= '=';
  }

  dashChar+= '==';

  log('');
  log(dashChar);
  log('');

  log(`  ${resultStr}  `);

  log('');
  log(dashChar);
  log('');

  if (!totalResult) {
    cb();
    return;
  }

  errList.data.forEach((item, i) => {
    const message = item.message;
    const code    = item.code;
    const title   = item.plugin;
    const type    = item.type || 'Error';

    if (!isDeveloping || type !== 'Warning') {
      notify.onError({
        title,
        message
      }).apply(this, arguments);
    }

    log(`---[ ${type} ${i + 1} ]-------------------------`);
    log(` |  Path : ${message}`);
    code !== '' && log(` |  ${code}`);
    log('');
  });

  log(dashChar);
  log('');

  errList.data = [];
  errList.totalError = 0;
  errList.totalWarning = 0;
  errors.isJSValid = true;

  cb();
})
