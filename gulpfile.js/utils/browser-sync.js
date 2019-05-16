const browserSyncInstance = require('browser-sync');

module.exports = {
  isStreaming: false,
  browserSync: browserSyncInstance.create()
};
