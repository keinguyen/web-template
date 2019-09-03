const { series } = require('gulp');
const buildLocales = require('./build--locales');
const copyAssets = require('./copy--assets');
const lintScripts = require('./lint--scripts');
const buildScriptsES6 = require('./build--scripts-es6');
const buildScriptsExternal = require('./build--scripts-external');
const buildStyles = require('./build--styles');
const buildStylesRtl = require('./build--styles-rtl');

const buildAssets = series(
  buildLocales,
  copyAssets,
  lintScripts,
  buildScriptsES6,
  buildScriptsExternal,
  buildStyles,
  buildStylesRtl
);

module.exports = buildAssets;
