process.env.NODE_ENV = 'production';

const { series } = require('gulp');

const cleanOutput = require('../private-tasks/clean--output');
const buildAssets = require('../private-tasks/build--assets');
const buildViews = require('../private-tasks/build--views');
const printResults = require('../private-tasks/print--results');

const tasks = [
  cleanOutput,
  buildAssets,
  buildViews,
  printResults
];

module.exports = series(...tasks);
