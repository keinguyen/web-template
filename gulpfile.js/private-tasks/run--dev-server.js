const { series } = require('gulp');

const runViews = require('./run--views');

const runDevServer = series(
  runViews
);

module.exports = runDevServer;
