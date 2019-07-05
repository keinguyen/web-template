const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

const { outputScript } = require('../config/directories');
const { handleError } = require('../utils/errors');
const { min } = require('../config/rename');

function bundleScripts () {
  return src([`${outputScript}externals.js`, `${outputScript}*.js`])
    .pipe(concat('scripts.js'))
    .on('error', handleError)
    .pipe(dest(outputScript))
    .pipe(rename(min))
    .pipe(uglify({
      mangle: {
        keep_fnames: true
      }
    }))
    .on('error', handleError)
    .pipe(dest(outputScript));
}

bundleScripts.displayName = 'bundle:scripts';

module.exports = bundleScripts;
