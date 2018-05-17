const gulp = require('gulp');
const rtlcss = require('gulp-rtlcss');
const rename = require('gulp-rename');

const cached = require('../utils/cached');

const {
  rtl: renameOpts
} = require('../config/rename');

const {
  browserSync
} = require('../utils/browser-sync');

const {
  distStyle
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors')

gulp.task('build:styles-apps-rtl', () => {
  return gulp
    .src(`${distStyle}apps.css`)
    .pipe(cached('apps-css-rtl'))
    .pipe(rtlcss())
    .on('error', handleError)
    .pipe(rename(renameOpts))
    .on('error', handleError)
    .pipe(gulp.dest(distStyle))
    .pipe(browserSync.stream())
});
