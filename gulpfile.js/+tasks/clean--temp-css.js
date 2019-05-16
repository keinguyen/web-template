const gulp = require('gulp');
const del = require('del');

const {
  dist
} = require('../config/directories');

const dest = `${dist}css/`;

gulp.task('clean:temp-css', () => del([
  `${dest}libs.css`,
  `${dest}apps.css`,
  `${dest}libs-rtl.css`,
  `${dest}apps-rtl.css`
]));
