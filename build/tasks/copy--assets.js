const gulp = require('gulp');
const changed = require('gulp-changed');

const {
  filesAssets,
  dist
} = require('../config/directories');

gulp.task('copy:assets', () => {
  return gulp
    .src(filesAssets)
    .pipe(changed(dist))
    .pipe(gulp.dest(dist))
});
