const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

const options = require('../config/nodemon');

gulp.task('server:views', (cb) => {
  let started = false;

  nodemon(options)
    .on('start', () => {
      if (started) {
        return;
      }

      started = true;
      cb();
    })
});
