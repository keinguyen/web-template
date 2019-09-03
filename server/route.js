const express = require('express');
const { join } = require('path');

const router = express.Router();
const { output, srcLocales } = require('../gulpfile.js/config/directories');
const { renderErrorHTML } = require('../gulpfile.js/utils');
const { DEFAULT_LANG } = require('../gulpfile.js/config/server');

const multiLang = process.env.MULTI_LANGUAGE;

function _require(path) {
  const _path = join(__dirname, path);

  delete require.cache[_path];

  return require(path);
}

router.get('/', (req, res) => {
  res.redirect(`/${multiLang ? `${DEFAULT_LANG}/index.html` : 'index.html'}`);
});

router.get('*.html', (req, res) => {
  try {
    let lang;
    let localeLang;
    let { url } = req;

    if (multiLang) {
      let testLang = /^\/([^/]+)\//.exec(url);

      if (!testLang) {
        throw 'No language in the url';
      }

      lang = testLang[1];
      localeLang = _require(`../${srcLocales + lang}.json`);

      url = url.replace(testLang[0], '');
    }

    let testFile = /[/]?(.+)\.html/.exec(url);

    if (!testFile) {
      throw 'Not found';
    }

    res.render(testFile[1], {
      $translator: localeLang || {},
      $localeName: lang
    }, (err, html) => {
      if (err) {
        throw err;
      }

      res.send(html);
    });
  } catch (err) {
    res.send(renderErrorHTML(err)).status(404);
  }
});

router.get('/[^/]+/', (req, res) => {
  res.redirect(join(req.url, 'index.html'));
});

router.post('*', (req, res) => {
  try {
    let json = _require(join(__dirname, '..', output, req.url));

    res.send(json);
  } catch (err) {
    res.send(renderErrorHTML(err)).status(404);
  }
});

module.exports = router;
