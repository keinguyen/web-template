const { src, dest, parallel } = require('gulp');
const pug = require('gulp-pug');

const { srcLocales, filesPugBuilt, output } = require('../config/directories');
const options = require('../config/pug');
const { handleError } = require('../utils/errors');

function generateBuildTmpFn (lang) {
  let outputPath = output;
  let pugOpts = {
    ...options,
    locals: {
      $translator: {},
      $localeName: lang
    }
  };

  if (lang) {
    outputPath = `${output + lang}/`;
    pugOpts.locals.$translator = require(`../../${srcLocales + lang}.json`);
  }

  function _buildViews () {
    return src(filesPugBuilt)
      .pipe(pug(pugOpts))
      .on('error', handleError)
      .pipe(dest(outputPath));
  }

  _buildViews.displayName = `build:views:${lang || 'single-lang'}`;

  return _buildViews;
}

function buildViews (cb) {
  const folders = process.env.MULTI_LANGUAGE;

  if (folders) {
    return parallel(...folders.split(',').map(generateBuildTmpFn))(cb);
  }

  return generateBuildTmpFn()();
}

buildViews.displayName = 'build:views';

module.exports = buildViews;
