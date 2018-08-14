const gulp = require('gulp');
const yargs = require('yargs');

const {
  env
} = yargs.argv;

const isDeveloping = env === 'dev';

const {
  srcLocales,
  filesPugAll,
  filesScssOthers,
  filesScssAppsWatch,
  filesScssLibsWatch,
  filesJs,
  fileJsLib,
  filesAssets
} = require('../config/directories');

const browserSyncOpts = require('../config/browser-sync');
const stream = require('../utils/browser-sync');
const cached = require('../utils/cached');

const clearCache = function (name) {
  typeof name === 'undefined'
    ? cached.caches = {}
    : delete cached.caches[name]
}

gulp.task('watch', () => {
  stream.isStreaming = true;
  stream.browserSync.init(browserSyncOpts);

  //----- HTML --------------------
  let watchViewsTask = isDeveloping
    ? gulp.series('reload')
    : gulp.series('build:views', gulp.parallel('reload', 'print:results'));

  gulp.watch(filesPugAll, watchViewsTask);

  //----- LOCALE --------------------
  gulp.watch(`${srcLocales}*/*.json`, gulp.series(
    'build:locales',
    watchViewsTask
  ));

  //----- CSS --------------------
  gulp.watch(filesScssOthers, gulp.series(
    'build:styles-others',
    'build:styles-others-rtl',
    'print:results'
  ));

  gulp.watch(filesScssAppsWatch, gulp.series(
    'build:styles-apps',
    'build:styles-apps-rtl',
    'print:results'
  ));

  gulp
    .watch(filesScssLibsWatch, gulp.series(
      'build:styles-apps',
      'build:styles-apps-rtl',
      'build:styles-libs',
      'build:styles-libs-rtl',
      'build:styles-others',
      'build:styles-others-rtl',
      'print:results'
    ))
    .on('change', () => clearCache('styles'));

  //----- JS --------------------
  gulp.watch(filesJs, gulp.series(
    'lint:scripts',
    'build:scripts-apps',
    gulp.parallel('reload', 'print:results')
  ));

  gulp.watch(fileJsLib, gulp.series(
    'build:scripts-libs',
    gulp.parallel('reload', 'print:results')
  ));

  //----- ASSETS --------------------
  gulp.watch(filesAssets, gulp.series(
    'copy:assets',
    gulp.parallel('reload', 'print:results')
  ));
});
