const del = require('del');

const { output } = require('../config/directories');

const cleanOutput = () => del(output);

cleanOutput.displayName = 'clean:output';

module.exports = cleanOutput;
