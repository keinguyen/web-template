const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const cached = require('gulp-cached');
const bulkSass = require('organizze-gulp-sass-bulk-import');
const sassUnicode = require('gulp-sass-unicode');
const autoprefixer = require('gulp-autoprefixer');

const {
  filesScssBuilt,
  outputStyle
} = require('../config/directories');
const sassOpts = require('../config/sass');
const browserSync = require('../utils/browser-sync');
const { handleError } = require('../utils/errors');

function buildStyles () {
  return src(filesScssBuilt)
    .pipe(cached('scss'))
    .pipe(bulkSass())
    .on('error', handleError)
    .pipe(sass(sassOpts))
    .on('error', handleError)
    .pipe(sassUnicode())
    .on('error', handleError)
    .pipe(autoprefixer())
    .on('error', handleError)
    .pipe(dest(outputStyle))
    .pipe(browserSync.stream());
}

buildStyles.displayName = 'build:styles';

module.exports = buildStyles;
