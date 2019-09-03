const { src, dest } = require('gulp');
const rename = require('gulp-rename');

const { filesChunkJs, outputChunkScripts } = require('../config/directories');
const { backup } = require('../config/rename');

function backupChunkScripts () {
  return src(filesChunkJs)
    .pipe(rename(backup))
    .pipe(dest(outputChunkScripts));
}

backupChunkScripts.displayName = 'backup:chunk-scripts';

module.exports = backupChunkScripts;
