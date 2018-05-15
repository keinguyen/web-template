const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

const {
  dist
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

const dest = `${dist}css/`;

gulp.task('bundle:css-rtl', () => {
  return gulp
    .src([`${dest}libs-rtl.css`, `${dest}apps-rtl.css`])
    .pipe(concat('styles-rtl.css'))
    .on('error', handleError)
    .pipe(gulp.dest(dest))
    .pipe(rename('styles-rtl.min.css'))
    .pipe(cleanCss())
    .on('error', handleError)
    .pipe(gulp.dest(dest))
});
