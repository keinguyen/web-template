const { src, dest, lastRun } = require('gulp');
const { filesAssets, output } = require('../config/directories');

function copyAssets () {
  return src(filesAssets, {
    since: lastRun(copyAssets)
  }).pipe(dest(output));
}

copyAssets.displayName = 'copy:assets';

module.exports = copyAssets;
