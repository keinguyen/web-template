const gulp = require('gulp');
const del = require('del');

const {
  dist
} = require('../config/directories');

gulp.task('clean:css', () => del(`${dist}css/`));
