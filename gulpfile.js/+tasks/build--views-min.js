const gulp = require('gulp');
const htmlReplace = require('gulp-html-replace');

const useminOpts = require('../config/usemin');

const {
  dist
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

gulp.task('build:views-min', () => {
  return gulp
    .src(`${dist}**/*.html`)
    .pipe(htmlReplace(useminOpts))
    .on('error', handleError)
    .pipe(gulp.dest(dist));
});
