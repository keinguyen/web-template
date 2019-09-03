const { parallel } = require('gulp');

const runViews = require('./run--views');
const runWatchers = require('./run--watchers');

const runDevServer = parallel(runViews, runWatchers);

module.exports = runDevServer;
