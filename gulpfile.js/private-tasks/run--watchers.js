const { series, parallel, watch } = require('gulp');
const cached = require('gulp-cached');

const reload = require('./reload');
const buildLocales = require('./build--locales');
const printResults = require('./print--results');
const buildStyles = require('./build--styles');
const buildStylesRtl = require('./build--styles-rtl');
const buildScriptsExternal = require('./build--scripts-external');
const lintScripts = require('./lint--scripts');
const buildScriptsES6 = require('./build--scripts-es6');
const copyAssets = require('./copy--assets');

const {
  filesPug,
  srcLocales,
  filesScssBuilt,
  filesScssPartial,
  filesJs,
  filesAssets
} = require('../config/directories');
const jsExternalPaths = require('../config/externals-js');

function runWatchers (cb) {
  const reloadAndShowResults = parallel(printResults, reload);

  //----- HTML --------------------
  watch(filesPug, reload);

  //----- LOCALE --------------------
  watch(`${srcLocales}*/*.json`, series(
    buildLocales,
    reloadAndShowResults
  ));

  //----- CSS --------------------
  watch(filesScssBuilt, series(
    buildStyles,
    buildStylesRtl,
    printResults
  ));

  watch(filesScssPartial, series(
    buildStyles,
    buildStylesRtl,
    printResults
  )).on('change', () => delete cached.caches.scss);

  //----- JS --------------------
  watch(jsExternalPaths, series(
    buildScriptsExternal,
    reloadAndShowResults
  ));

  watch(filesJs, series(
    lintScripts,
    buildScriptsES6,
    reloadAndShowResults
  ));

  //----- ASSETS --------------------
  watch(filesAssets, series(
    copyAssets,
    reloadAndShowResults
  ));

  cb();
}

runWatchers.displayName = 'run:watchers';

module.exports = runWatchers;
