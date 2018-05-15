const gulp = require('gulp');
const del = require('del');

const {
  dist
} = require('../config/directories');

gulp.task('clean:dist', () => del(dist));
