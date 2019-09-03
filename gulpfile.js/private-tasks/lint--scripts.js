const { src } = require('gulp');
const eslint = require('gulp-eslint');
const cached = require('gulp-cached');

const { filesJs } = require('../config/directories');
const { handleESLintError } = require('../utils/errors');
const stream = require('../utils/browser-sync');

function lintScripts () {
  let _gulp = src(filesJs)
    .pipe(cached('eslint'))
    .pipe(eslint())
    .pipe(eslint.results(handleESLintError));

  if (stream.isStreaming) {
    return _gulp;
  }

  return _gulp
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
}

lintScripts.displayName = 'lint:scripts';

module.exports = lintScripts;
