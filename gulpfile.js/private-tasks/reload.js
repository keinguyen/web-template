const browserSync = require('../utils/browser-sync');

function reload (cb) {
  browserSync.reload();
  cb();
}

reload.displayName = 'reload';

module.exports = reload;
