const { src, dest } = require('gulp');
const concat = require('gulp-concat');

const jsExternalPaths = require('../config/externals-js');
const { outputScript } = require('../config/directories');
const { handleError } = require('../utils/errors');

const isDevelopment = process.env.NODE_ENV !== 'production';

function buildScriptsExternal () {
  return src(jsExternalPaths, { sourcemaps: isDevelopment })
    .pipe(concat('externals.js'))
    .on('error', handleError)
    .pipe(dest(outputScript, { sourcemaps: isDevelopment && '.' }));
}

buildScriptsExternal.displayName = 'build:scripts-external';

module.exports = buildScriptsExternal;
