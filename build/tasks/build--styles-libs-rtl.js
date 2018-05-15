const gulp = require('gulp');
const rtlcss = require('gulp-rtlcss');
const rename = require('gulp-rename');

const cached = require('../utils/cached');

const renameOpts = require('../config/rename');

const {
  browserSync
} = require('../utils/browser-sync');

const {
  distStyle
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors')

gulp.task('build:styles-libs-rtl', () => {
  return gulp
    .src(`${distStyle}libs.css`)
    .pipe(cached('libs-css-rtl'))
    .pipe(rtlcss())
    .on('error', handleError)
    .pipe(rename(renameOpts))
    .on('error', handleError)
    .pipe(gulp.dest(distStyle))
    .pipe(browserSync.stream())
});
