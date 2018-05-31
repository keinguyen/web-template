const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const options = require('../config/nodemon');

const {
  browserSync
} = require('../utils/browser-sync');

gulp.task('server:views', (cb) => {
  let started = false;

  nodemon(options)
    .on('start', () => {
      if (started) {
        return;
      }

      started = true;
      // Force reload to make sure
      // browsersync was not started
      // before node server start
      setTimeout(() => {
        browserSync.reload();
      }, 2000);
      cb();
    });
});
