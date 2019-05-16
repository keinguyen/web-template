const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const {
  dist
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

const dest = `${dist}js/`;

gulp.task('bundle:js-polyfill', () => {
  return gulp
    .src(`${dest}polyfill.js`)
    .pipe(rename('polyfill.min.js'))
    .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest(dest));
});
