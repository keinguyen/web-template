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
  buildStyles('libs'),
  buildStyles(),
  buildStylesRtl('libs'),
  buildStylesRtl()
);

module.exports = buildAssets;

// gulp.task('build:assets', gulp.series(
//   'build:locales',
//   // 'build:scripts-libs',
//   // 'lint:scripts',
//   // 'build:scripts-apps',
//   // 'build:styles-apps',
//   // 'build:styles-apps-rtl',
//   // 'build:styles-libs',
//   // 'build:styles-libs-rtl',
//   // 'build:styles-others',
//   // 'build:styles-others-rtl',
//   // 'copy:assets'
// ));
