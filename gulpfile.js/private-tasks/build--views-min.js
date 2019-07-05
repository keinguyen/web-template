const gulp = require('gulp');
const htmlReplace = require('gulp-html-replace');

const useminOpts = require('../config/usemin');
const { output } = require('../config/directories');
const { handleError } = require('../utils/errors');

function buildViewsMin () {
  return gulp
    .src(`${output}**/*.html`)
    .pipe(htmlReplace(useminOpts))
    .on('error', handleError)
    .pipe(gulp.dest(output));
}

buildViewsMin.displayName = 'build:views-min';

module.exports = buildViewsMin;
