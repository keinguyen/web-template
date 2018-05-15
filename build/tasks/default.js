const gulp = require('gulp');
const yargs = require('yargs');

const {
  env
} = yargs.argv;

const isDeveloping = env === 'dev';

const defaultBuildTask = isDeveloping
  ? gulp.series(
    'clean:dist',
    'build:assets',
    'print:results',
    'server'
  )
  : gulp.series(
      'clean:dist',
      'build:views',
      'build:views-min',
      'build:assets',
      'bundle:css',
      'bundle:css-rtl',
      'bundle:js',
      'clean:temp-css',
      'clean:temp-js',
      'print:results'
    );

gulp.task('default', defaultBuildTask);
