const del = require('del');

const { outputScript } = require('../config/directories');

const cleanTempScripts = () => del([
  `${outputScript}*.js`,
  `${outputScript}*.map`,
  `!${outputScript}scripts.js`,
  `!${outputScript}scripts.min.js`
]);

cleanTempScripts.displayName = 'clean:temp-scripts';

module.exports = cleanTempScripts;
