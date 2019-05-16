const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');

const options = require('../config/gh-pages');

const {
  allDistFiles
} = require('../config/directories');

gulp.task('deploy:gh-pages', () => {
  return gulp
    .src(allDistFiles)
    .pipe(ghPages(options));
});
