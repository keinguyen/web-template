const gulp = require('gulp');

gulp.task('build:js', gulp.series(
  'clean:js',
  'build:scripts-libs',
  'lint:scripts',
  'build:scripts-apps',
  'bundle:js',
  'clean:temp-js',
  'print:results'
));
