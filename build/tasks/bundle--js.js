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

gulp.task('bundle:js', () => {
  return gulp
    .src([`${dest}libs.js`, `${dest}apps.js`])
    .pipe(concat('scripts.js'))
    .on('error', handleError)
    .pipe(gulp.dest(dest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .on('error', handleError)
    .pipe(gulp.dest(dest));
});
