const gulp = require('gulp');
const changed = require('gulp-changed');

const {
  filesFontAwesome,
  distFontAwesome
} = require('../config/directories');

gulp.task('copy:fonts-awesome', () => {
  return gulp
    .src(filesFontAwesome)
    .pipe(changed(distFontAwesome))
    .pipe(gulp.dest(distFontAwesome))
});
