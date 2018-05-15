const gulp = require('gulp');
const concat = require('gulp-concat');

const dirJsLib = require('../config/js-lib');

const {
  distScript
} = require('../config/directories');

gulp.task('build:scripts-libs', () => {
  return gulp.src(dirJsLib)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest(distScript))
});
