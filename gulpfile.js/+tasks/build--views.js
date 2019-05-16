const gulp = require('gulp');
const pug = require('gulp-pug');

const options = require('../config/pug');

const {
  filesPug
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

const buildViews = () => {
  return gulp
    .src(filesPug)
    .pipe(pug(options))
    .on('error', handleError)
    .pipe(gulp.dest(options.i18n.dest));
};

buildViews.displayName = 'build:views';

module.exports = buildViews;
