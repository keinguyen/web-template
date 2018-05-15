const gulp = require('gulp');
const sass = require('gulp-sass');
const sassUnicode = require('gulp-sass-unicode');
const bulkSass = require('gulp-sass-bulk-import');
const autoprefixer = require('gulp-autoprefixer');

const cached = require('../utils/cached');

const sassOpts = require('../config/sass');
const autoprefixerOpts = require('../config/autoprefixer');

const {
  browserSync
} = require('../utils/browser-sync');

const {
  filesScssApps,
  distStyle
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors')

gulp.task('build:styles-apps', () => {
  return gulp
    .src(filesScssApps)
    .pipe(bulkSass())
    .on('error', handleError)
    .pipe(sass(sassOpts))
    .on('error', handleError)
    .pipe(sassUnicode())
    .on('error', handleError)
    .pipe(autoprefixer(autoprefixerOpts))
    .on('error', handleError)
    .pipe(gulp.dest(distStyle))
    .pipe(browserSync.stream())
});
