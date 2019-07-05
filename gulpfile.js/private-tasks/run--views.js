const nodemon = require('gulp-nodemon');

const browserSync = require('../utils/browser-sync');
const options = require('../config/nodemon');
const browserSyncOpts = require('../config/browser-sync');

function runViews (cb) {
  let started = false;

  nodemon({
    ...options,
    env: {
      MULTI_LANGUAGE: process.env.MULTI_LANGUAGE
    }
  })
    .on('start', () => {
      if (started) {
        cb();
        return;
      }

      started = true;

      setTimeout(() => {
        browserSync.isStreaming = true;
        browserSync.init(browserSyncOpts);

        cb();
      }, 1000);
    });
}

runViews.displayName = 'run:views';

module.exports = runViews;
