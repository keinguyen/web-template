const {
  srcScript,
  nodeModules
} = require('./directories');

const LIB_PATH = `${srcScript}_libs/`;

module.exports = [
  `${LIB_PATH}modernizr-custom-3.6.0.js`,
  `${nodeModules}detectizr/dist/detectizr.js`,
  `${nodeModules}picturefill/dist/picturefill.js`,
  `${nodeModules}picturefill/dist/plugins/mutation/pf.mutation.js`,
  `${LIB_PATH}custom.js`
]
