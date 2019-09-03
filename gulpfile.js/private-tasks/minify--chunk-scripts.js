const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

const { filesChunkJs, outputChunkScripts } = require('../config/directories');
const { handleError } = require('../utils/errors');

function minifyChunkScripts () {
  return src(filesChunkJs)
    .pipe(uglify({
      mangle: {
        keep_fnames: true
      }
    }))
    .on('error', handleError)
    .pipe(dest(outputChunkScripts));
}

minifyChunkScripts.displayName = 'minify:chunk-scripts';

module.exports = minifyChunkScripts;
