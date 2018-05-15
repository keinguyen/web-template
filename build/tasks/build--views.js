const gulp = require('gulp');
const pug = require('gulp-i18n-pug');

const options = require('../config/pug');

const {
  filesPug
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

gulp.task('build:views', () => {
  return gulp
    .src(filesPug)
    .pipe(pug(options))
    .on('error', handleError)
    .pipe(gulp.dest(options.i18n.dest));
});
