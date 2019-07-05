// Change this value to false if you don't wanna use cache
const { DEFAULT_LANG } = require('./server');

const useCache = true;
const cache = useCache ? 0 : +new Date;

module.exports = {
  css: `/css/styles.min.css?_cache=${cache}`,
  'css-rtl': `/css/styles-rtl.min.css?_cache=${cache}`,
  js: `/js/scripts.min.js?_cache=${cache}`,
  redirect: `<meta http-equiv="refresh" content="0;url=/${DEFAULT_LANG}/">`
};
