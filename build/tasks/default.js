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
      'build:assets',
      'bundle:css',
      'bundle:css-rtl',
      'bundle:js',
      'bundle:js-polyfill',
      'clean:temp-css',
      'clean:temp-js',
      'build:views',
      'build:views-min',
      'print:results'
    );

gulp.task('default', defaultBuildTask);
