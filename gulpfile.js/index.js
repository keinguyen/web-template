const requireDir = require('require-dir');

const tasks = requireDir('./tasks');

Object.keys(tasks).forEach((name) => {
  exports[name] = tasks[name];
});
