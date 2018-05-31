const gulp = require('gulp');
const eslint = require('gulp-eslint');

const options = require('../config/eslint');

const {
  filesJs
} = require('../config/directories');

const cached = require('../utils/cached');
const errors = require('../utils/errors');

const stream = require('../utils/browser-sync');

gulp.task('lint:scripts', () => {
  let tmpGulp = gulp
    .src(filesJs)
    .pipe(cached('eslint'))
    .pipe(eslint(options))
    .pipe(eslint.results((results) => {
      let isValid = errors.handleESLintError(results);
      errors.isJSValid = isValid;
      !isValid && delete cached.caches.eslint;
    }));

  if (stream.isStreaming) {
    cb();
    return tmpGulp;
  }

  return tmpGulp
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});
