const gulp = require('gulp');
const merge = require('gulp-merge-json');
const mergeStream = require('merge-stream');
const {
  join
} = require('path');
const {
  readdirSync,
  statSync
} = require('fs');

const {
  srcLocales
} = require('../config/directories');

const {
  handleError
} = require('../utils/errors');

const getFolders = (dir) => {
  return readdirSync(dir).filter((file) => {
    return statSync(join(dir, file)).isDirectory();
  });
};

gulp.task('build:locales', (cb) => {
  let folders = getFolders(srcLocales);

  if (!folders[0]) {
    return cb();
  }

  let tasks = folders.map((folder) => {
    return gulp
      .src(join(srcLocales, folder, '/**/*.json'))
      .pipe(merge({
        fileName: `${folder}.json`,
        jsonSpace: '  '
      }))
      .on('error', handleError)
      .pipe(gulp.dest(srcLocales));
  });

  return mergeStream(tasks);
});
