const gulp = require('gulp');
const requireDir = require('require-dir');
const FwdRef = require('undertaker-forward-reference');

gulp.registry(FwdRef());

requireDir('./build/tasks');
