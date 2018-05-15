const gulp = require('gulp');
const {
  browserSync
} = require('../utils/browser-sync');

gulp.task('reload', (cb) => {
  browserSync.reload();
  cb();
});
