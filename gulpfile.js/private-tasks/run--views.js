const nodemon = require('gulp-nodemon');

const options = require('../config/nodemon');
const browserSync = require('../utils/browser-sync');

function runViews (cb) {
  let started = false;

  nodemon({
    ...options,
    env: {
      'isNoLocale': process.env.isNoLocale
    }
  })
    .on('start', () => {
      if (started) {
        return;
      }

      started = true;
      // Force reload to make sure
      // browsersync was not started
      // before node server start
      setTimeout(() => {
        browserSync.reload();
      }, 2000);
      cb();
    });
}

runViews.displayName = 'run:views'

module.exports = runViews;
