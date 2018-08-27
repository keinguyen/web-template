const {
  nodeModules,
  dist,
  srcAsset,
  srcStyle,
  srcScript,
  srcView
} = require('./directories');

module.exports = {
  script: 'server/index.js',
  ignore: [
    'gulpfile.js',
    nodeModules,
    dist,
    srcAsset,
    srcStyle,
    srcScript,
    srcView
  ]
};
