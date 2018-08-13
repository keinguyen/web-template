const gulp = require('gulp');
const del = require('del');

const {
  distScript
} = require('../config/directories');

gulp.task('clean:temp-js', () => del([
  `${distScript}libs.js`,
  `${distScript}apps.js`,
  `${distScript}**/*.map`
]));
