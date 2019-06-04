const { src, dest } = require('gulp');
const sass = require('gulp-sass');
const bulkSass = require('organizze-gulp-sass-bulk-import');
const sassUnicode = require('gulp-sass-unicode');
const autoprefixer = require('gulp-autoprefixer');

const {
  outputStyle,
  filesScssLib,
  filesScssBuilt
} = require('../config/directories');
const sassOpts = require('../config/sass');
const browserSync = require('../utils/browser-sync');
const { handleError } = require('../utils/errors');

function buildStyles (name) {
  let _path = name === 'libs' ? filesScssLib : filesScssBuilt;

  function _buildStyles () {
    return src(_path)
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

  _buildStyles.displayName = `build:styles-${name || 'others'}`

  return _buildStyles;
}

module.exports = buildStyles;
