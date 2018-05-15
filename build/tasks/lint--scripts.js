const gulp = require('gulp');
const eslint = require('gulp-eslint');

const options = require('../config/eslint');

const {
  filesJs
} = require('../config/directories');

const cached = require('../utils/cached');
const errors = require('../utils/errors');

const {
  isStreaming
} = require('../utils/browser-sync');

gulp.task('lint:scripts', () => {
  let tmpGulp = gulp
    .src(filesJs)
    .pipe(cached('eslint'))
    .pipe(eslint(options))
    .pipe(eslint.results((results) => {
      errors.isJSValid = errors.handleESLintError(results)
    }));

  if (isStreaming) {
    cb();
    return tmpGulp;
  }

  return tmpGulp
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
});
