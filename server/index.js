//____________________________________________
//                             REQUIRE CONFIGS
const {
  port
} = require('../build/config/server');

const {
  srcView,
  src,
  dist
} = require('../build/config/directories');

const pugOptions = require('../build/config/pug');



//____________________________________________
//                              REQUIRE MODULE
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const requireDir = require('require-dir');
const { join } = require('path');



//____________________________________________
//                             SERVER VARIABLE
const locales = requireDir(`../${src}locales`);
const app = express();


//____________________________________________
//                                SETUP SERVER
app.engine('pug', (path, options, callback) => {
  pug.renderFile(path, pugOptions, (err, result) => {
    let data = result ? result : `
      <body>
        <style>
          html {
            background-color: #000;
            color: #fff;
          }
        </style>
        <pre>${err.stack}</pre>
      </body>
    `;

    callback(null, data);
  });
})

app.use(express.static(dist));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
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
  let testFile = /^\/[^\/]+\/(.*)\.html/.exec(req.url);
  let testLang =  /^\/([^\/]+)\//.exec(req.url);

  if (testFile) {
    let file = testFile[1];
    let lang = testLang[1];

    if (locales[lang]) {
      pugOptions.translate = locales[lang];
      pugOptions.$localeName = lang;
      res.render(file);
    } else {
      res.send('Not found').status(404);
    }
  } else {
    res.send('Not found').status(404);
  }
});

app.post('*', (req, res) => {
  try {
    let json = require(join(__dirname, dist, req.url));
    res.send(json);
  } catch (err) {
    res.send('Not found').status(404);
  }
});



//____________________________________________
//                                    USE PORT
const logPort = `----- Server listen at ${port.server} -----`
app.listen(port.server, () => console.log(logPort))
