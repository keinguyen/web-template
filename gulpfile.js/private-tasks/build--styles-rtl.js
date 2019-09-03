const { src, dest, lastRun } = require('gulp');
const rtlcss = require('gulp-rtlcss');
const rename = require('gulp-rename');

const {
  outputStyle,
  filesCssBuilt
} = require('../config/directories');
const { rtl: renameOpts } = require('../config/rename');
const browserSync = require('../utils/browser-sync');
const { handleError } = require('../utils/errors');

function buildStylesRtl () {
  return src(filesCssBuilt, {
    since: lastRun(buildStylesRtl)
  })
    .pipe(rtlcss())
    .on('error', handleError)
    .pipe(rename(renameOpts))
    .on('error', handleError)
    .pipe(dest(outputStyle))
    .pipe(browserSync.stream());
}

buildStylesRtl.displayName = 'build:styles-rtl';

module.exports = buildStylesRtl;
