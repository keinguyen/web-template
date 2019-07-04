//____________________________________________
//                              REQUIRE MODULE
const express = require('express');
const pug = require('pug');

//____________________________________________
//                             REQUIRE CONFIGS
const route = require('./route');
const { STATIC_PORT } = require('../gulpfile.js/config/server');
const { srcView, output } = require('../gulpfile.js/config/directories');
const pugOptions = require('../gulpfile.js/config/pug');
const { renderErrorHTML } = require('../gulpfile.js/utils');

//____________________________________________
//                             SERVER VARIABLE
const app = express();
const { log } = console;

//____________________________________________
//                                SETUP SERVER
app.engine('pug', (path, options, callback) => {
  let opts = { ...pugOptions, ...options };

  pug.renderFile(path, opts, (err, result) => {
    let data = result || renderErrorHTML(err.message);

    callback(null, data);
  });
});

app.set('views', srcView);
app.set('view engine', 'pug');
app.use(express['static'](output));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/', route);

//____________________________________________
//                                    USE PORT
const logPort = `----- View server is running at http://localhost:${STATIC_PORT} -----`;

app.listen(STATIC_PORT, () => log(logPort));
