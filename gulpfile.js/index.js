const requireDir = require('require-dir');

const task = process.argv[2];

process.env.NODE_ENV = ~['build'].indexOf(task) ? 'production' : 'development';

const tasks = requireDir('./tasks');

Object.keys(tasks).forEach((name) => {
  exports[name] = tasks[name];
});
