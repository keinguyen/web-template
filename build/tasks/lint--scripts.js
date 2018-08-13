const gulp = require('gulp');
const eslint = require('gulp-eslint');

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
    .pipe(eslint())
    .pipe(eslint.results((results) => {
      let { error, warning } = errors.handleESLintError(results);

      errors.isJSValid = !error;

      error || warning && delete cached.caches.eslint;
    }));

  if (stream.isStreaming) {
    return tmpGulp;
  }

  return tmpGulp
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
