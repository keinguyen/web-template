const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

const {
  min: renameOpts
} = require('../config/rename');

const {
  dist
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

const dest = `${dist}css/`;

gulp.task('bundle:css', () => {
  return gulp
    .src([`${dest}libs.css`, `${dest}apps.css`])
    .pipe(concat('styles.css'))
    .on('error', handleError)
    .pipe(gulp.dest(dest))
    .pipe(rename(renameOpts))
    .pipe(cleanCss())
    .on('error', handleError)
    .pipe(gulp.dest(dest));
});
