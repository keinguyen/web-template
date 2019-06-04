// const express = require('express');
// const requireDir = require('require-dir');
// const { join } = require('path');

// const router = express.Router();
// const { renderErrorHTML } = require('../gulpfile.js/utils');

// const locales = requireDir(`../${src}locales`);
// const DEFAULT_LANG = 'en';

// console.log(process.env.isNoLocale)

// router.get('/', (req, res) => {
//   res.redirect('/en/index.html');
// });

// router.get('/[^\/]+/', (req, res) => {
//   res.redirect(`${req.url}index.html`);
// });

// router.get('/[^\/]+/*.html', (req, res) => {
//   try {
//     let testLang = /^\/([^\/]+)\//.exec(req.url);
//     let lang = testLang ? testLang[1] : DEFAULT_LANG;

//     if (!locales[lang]) {
//       throw 'Not found';
//     }

//     let testFile = /^\/[^\/]+\/(.*)\.html/.exec(req.url);

//     if (!testFile) {
//       throw 'Not found';
//     }

//     res.render(testFile[1], {
//       [pugOptions.i18n.namespace]: locales[lang],
//       $localeName: lang
//     });
//   } catch (err) {
//     res.send(renderErrorHTML(err)).status(404);
//   }
// });

// router.post('*', (req, res) => {
//   try {
//     let json = require(join(__dirname, '..', dist, req.url));

//     res.send(json);
//   } catch (err) {
//     res.send(renderErrorHTML(err)).status(404);
//   }
// });
