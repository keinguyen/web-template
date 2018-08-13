const gulp = require('gulp');
const concat = require('gulp-concat');

const dirJsLib = require('../config/js-lib');

const {
  distScript
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

gulp.task('build:scripts-libs', () => {
  return gulp.src(dirJsLib)
    .pipe(concat('libs.js'))
    .on('error', handleError)
    .pipe(gulp.dest(distScript));
});
