const gulp = require('gulp');
const sftp = require('gulp-sftp');

const options = require('../config/ftp');

const {
  allDistFiles
} = require('../config/directories');

gulp.task('deploy:ftp', () => {
  return gulp
    .src(allDistFiles)
    .pipe(sftp(options))
});
