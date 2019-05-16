const { series } = require('gulp');
const buildLocales = require('./build--locales');
const copyAssets = require('./copy--assets');

const buildAssets = series(buildLocales, copyAssets);

buildAssets.displayName = 'build:assets';

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
