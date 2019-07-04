const { src, dest, lastRun } = require('gulp');
const rtlcss = require('gulp-rtlcss');
const rename = require('gulp-rename');

const {
  outputStyle,
  filesCssLib,
  filesCssBuilt
} = require('../config/directories');
const { rtl: renameOpts } = require('../config/rename');
const browserSync = require('../utils/browser-sync');
const { handleError } = require('../utils/errors');

function buildStylesRtl (name) {
  let _path = name === 'libs' ? filesCssLib : filesCssBuilt;

  function _buildStylesRtl () {
    return src(_path, {
      since: lastRun(_buildStylesRtl)
    })
      .pipe(rtlcss())
      .on('error', handleError)
      .pipe(rename(renameOpts))
      .on('error', handleError)
      .pipe(dest(outputStyle))
      .pipe(browserSync.stream());
  }

  _buildStylesRtl.displayName = `build:styles-rtl-${name || 'others'}`;

  return _buildStylesRtl;
}

module.exports = buildStylesRtl;
