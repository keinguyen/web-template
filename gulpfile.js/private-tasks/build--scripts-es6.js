const { src, dest } = require('gulp');
const webpack = require('webpack-stream');
const vinylNamed = require('vinyl-named');

const { filesJsES6, outputScript } = require('../config/directories');
const option = require('../config/webpack');
const { list, handleError } = require('../utils/errors');

function buildScriptsES6 (cb) {
  if (!list.isJSValid) {
    return cb();
  }

  return src(filesJsES6)
    .pipe(vinylNamed())
    .pipe(webpack(option))
    .on('error', handleError)
    .pipe(dest(outputScript));
}

buildScriptsES6.displayName = 'build:scripts-es6';

module.exports = buildScriptsES6;
