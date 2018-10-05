const gulp = require('gulp');
const webpack = require('webpack-stream');
const vinylNamed = require('vinyl-named');

const {
  srcScript,
  distScript
} = require('../config/directories');
const option = require('../config/webpack');
const errors = require('../utils/errors');

gulp.task('build:scripts-apps', (cb) => {
  if (!errors.isJSValid) {
    return cb();
  }

  return gulp
    .src(`${srcScript}*.js`)
    .pipe(vinylNamed())
    .pipe(webpack(option))
    .on('error', errors.handleError)
    .pipe(gulp.dest(distScript));
});
