const { src, dest } = require('gulp');
const rename = require('gulp-rename');
const cleanCss = require('gulp-clean-css');

const { outputStyle } = require('../config/directories');
const { min } = require('../config/rename');
const { handleError } = require('../utils/errors');

function minifyStyles () {
  return src(`${outputStyle}**/*.css`)
    .pipe(rename(min))
    .pipe(cleanCss())
    .on('error', handleError)
    .pipe(dest(outputStyle));
}

minifyStyles.displayName = 'minify:styles';

module.exports = minifyStyles;
