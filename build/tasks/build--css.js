const gulp = require('gulp');

gulp.task('build:css', gulp.series(
  'build:styles-apps',
  'build:styles-apps-rtl',
  'build:styles-libs',
  'build:styles-libs-rtl',
  'build:styles-others',
  'build:styles-others-rtl',
  'bundle:css',
  'bundle:css-rtl',
  'clean:temp-css',
  'print:results'
));
