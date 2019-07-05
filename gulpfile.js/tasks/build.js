const { series } = require('gulp');

const cleanOutput = require('../private-tasks/clean--output');
const buildAssets = require('../private-tasks/build--assets');
const bundleScripts = require('../private-tasks/bundle--scripts');
const cleanTempScripts = require('../private-tasks/clean--temp-scripts');
const backupChunkScripts = require('../private-tasks/backup--chunk-scripts');
const minifyChunkScripts = require('../private-tasks/minify--chunk-scripts');
const bundleStyles = require('../private-tasks/bundle--styles');
const cleanTempStyles = require('../private-tasks/clean--temp-styles');
const minifyStyles = require('../private-tasks/minify--styles');
const buildViews = require('../private-tasks/build--views');
const buildViewsMin = require('../private-tasks/build--views-min');
const printResults = require('../private-tasks/print--results');

const tasks = [
  cleanOutput,
  buildAssets,
  bundleScripts,
  cleanTempScripts,
  backupChunkScripts,
  minifyChunkScripts,
  bundleStyles(),
  bundleStyles(true),
  cleanTempStyles,
  minifyStyles,
  buildViews,
  buildViewsMin,
  printResults
];

module.exports = series(...tasks);
