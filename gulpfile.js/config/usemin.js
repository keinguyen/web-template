const cache = +new Date;

module.exports = {
  css: `/css/styles.min.css?_cache=${cache}`,
  'css-rtl': `/css/styles-rtl.min.css?_cache=${cache}`,
  js: `/js/scripts.min.js?_cache=${cache}`,
};
