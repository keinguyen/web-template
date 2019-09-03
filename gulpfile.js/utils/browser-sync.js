const browserSync = require('browser-sync');
const browserSyncInstance = browserSync.create();

browserSyncInstance.isStreaming = false;

module.exports = browserSyncInstance;
