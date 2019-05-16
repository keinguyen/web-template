const gulp = require('gulp');

gulp.task('build:html', gulp.series(
  'build:views',
  'build:views-min',
  'print:results'
));
