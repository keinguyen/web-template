const gulp = require('gulp');

gulp.task('build:js', gulp.series(
  'build:scripts-libs',
  'lint:scripts',
  'build:scripts-apps',
  'bundle:js',
  'clean:temp-js',
  'print:results'
));
