const del = require('del');

const { outputStyle } = require('../config/directories');

const cleanTempStyles = () => del([
  `${outputStyle}$libs.css`,
  `${outputStyle}$libs-rtl.css`,
  `${outputStyle}apps.css`,
  `${outputStyle}apps-rtl.css`
]);

cleanTempStyles.displayName = 'clean:temp-styles';

module.exports = cleanTempStyles;
