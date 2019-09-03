const { src, dest, parallel } = require('gulp');
const merge = require('gulp-merge-json');

const { srcLocales } = require('../config/directories');
const { getFolders } = require('../utils');
const { handleError } = require('../utils/errors');

function generateBuildTmpFn (folder) {
  function _buildLocale () {
    return src(`${srcLocales}/${folder}/**/*.json`)
      .pipe(merge({
        fileName: `${folder}.json`,
        jsonSpace: '  '
      }))
      .on('error', handleError)
      .pipe(dest(srcLocales));
  }

  _buildLocale.displayName = `build:locale:${folder}`;

  return _buildLocale;
}

function buildLocales (cb) {
  const folders = getFolders(srcLocales);

  if (folders[0]) {
    process.env.MULTI_LANGUAGE = folders;
    return parallel(...folders.map(generateBuildTmpFn))(cb);
  }

  return cb();
}

buildLocales.displayName = 'build:locales';

module.exports = buildLocales;
