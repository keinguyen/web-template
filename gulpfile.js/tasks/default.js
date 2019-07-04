process.env.NODE_ENV = 'development';

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

// const defaultBuildTask = isDeveloping
//   ? series(
//     'clean--dist',
//     'build--assets',
//     'print--results',
//     'server'
//   )
//   : series(
//       'clean--dist',
//       'build--assets',
//       'bundle--css',
//       'bundle--css-rtl',
//       'bundle--js',
//       'bundle--js-polyfill',
//       'clean--temp-css',
//       'clean--temp-js',
//       'build--views',
//       'build--views-min',
//       'print--results'
//     );

module.exports = series(...tasks);
