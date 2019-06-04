const {
  srcAsset,
  srcStyle,
  srcScript,
  srcView
} = require('./directories');

module.exports = {
  script: 'server/index.js',
  watch: [
    'server/',
    'src/'
  ],
  ignore: [
    srcAsset,
    srcStyle,
    srcScript,
    srcView
  ]
};
