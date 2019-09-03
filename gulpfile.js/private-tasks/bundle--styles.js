const { src, dest } = require('gulp');
const concat = require('gulp-concat');

const { outputStyle } = require('../config/directories');
const { handleError } = require('../utils/errors');

function bundleStyles (isRTL) {
  const suffix = isRTL ? '-rtl' : '';
  const libsCss = `${outputStyle}$libs${suffix}.css`;
  const appsCss = `${outputStyle}apps${suffix}.css`;
  const concatCss = `styles${suffix}.css`;

  function _bundleStyles () {
    return src([libsCss, appsCss])
    .pipe(concat(concatCss))
    .on('error', handleError)
    .pipe(dest(outputStyle));
  }

  _bundleStyles.displayName = `bundle:styles:${isRTL ? 'rtl' : 'origin'}`;

  return _bundleStyles;
}

module.exports = bundleStyles;
