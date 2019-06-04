//____________________________________________
//                              REQUIRE MODULE
const express = require('express');
const pug = require('pug');
const requireDir = require('require-dir');
const {
  join
} = require('path');


//____________________________________________
//                             REQUIRE CONFIGS
const {
  port: { server: serverPort }
} = require('../build/config/server');

const {
  srcView,
  src,
  dist
} = require('../build/config/directories');

const pugOptions = require('../build/config/pug');


//____________________________________________
//                             SERVER VARIABLE
const locales = requireDir(`../${src}locales`);
const app = express();
const DEFAULT_LANG = 'en';

const renderErrorHTML = (msg) => `
  <body>
    <style>
      html {
        background-color: #000;
        color: #fff;
      }
    </style>
    <pre>${msg}</pre>
  </body>
`;


//____________________________________________
//                                SETUP SERVER
app.engine('pug', (path, options, callback) => {
  let opts = Object.assign({}, pugOptions, options);

  pug.renderFile(path, opts, (err, result) => {
    let data = result ? result : renderErrorHTML(err.stack);

    callback(null, data);
  });
})

app.use(express.static(dist));
app.use(express.json());
app.use(express.urlencoded());
app.set('views', srcView);
app.set('view engine', 'pug');


//____________________________________________
//                              SERVER REQUEST
app.get('/', (req, res) => {
  res.redirect('/en/index.html');
});

app.get('/[^\/]+/', (req, res) => {
  res.redirect(`${req.url}index.html`);
});

app.get('/[^\/]+/*.html', (req, res) => {
  try {
    let testLang = /^\/([^\/]+)\//.exec(req.url);
    let lang = testLang ? testLang[1] : DEFAULT_LANG;

    if (!locales[lang]) {
      throw 'Not found';
    }

    let testFile = /^\/[^\/]+\/(.*)\.html/.exec(req.url);

    if (!testFile) {
      throw 'Not found';
    }

    res.render(testFile[1], {
      [pugOptions.i18n.namespace]: locales[lang],
      $localeName: lang
    });
  } catch (err) {
    res.send(renderErrorHTML(err)).status(404);
  }
});

app.post('*', (req, res) => {
  try {
    let json = require(join(__dirname, '..', dist, req.url));

    res.send(json);
  } catch (err) {
    res.send(renderErrorHTML(err)).status(404);
  }
});



//____________________________________________
//                                    USE PORT
const logPort = `----- Server listen at ${serverPort} -----`;
app.listen(serverPort, () => console.log(logPort));
