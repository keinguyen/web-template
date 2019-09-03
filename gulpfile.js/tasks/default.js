const { series } = require('gulp');

const cleanOutput = require('../private-tasks/clean--output');
const buildAssets = require('../private-tasks/build--assets');
const printResults = require('../private-tasks/print--results');
const runDevServer = require('../private-tasks/run--dev-server');

const tasks = [
  cleanOutput,
  buildAssets,
  printResults,
  runDevServer
];

module.exports = series(...tasks);
