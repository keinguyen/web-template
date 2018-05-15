const {
  dist,
  srcLocales
} = require('./directories');

module.exports = {
  i18n: {
    dest: dist,
    locales: `${srcLocales}*.json`,
    namespace: 'translate'
  },
  pretty: true,
  doctype: 'html'
}
