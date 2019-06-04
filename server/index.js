//____________________________________________
//                              REQUIRE MODULE
const express = require('express');
const pug = require('pug');

//____________________________________________
//                             REQUIRE CONFIGS
const route = require('./route');
const { DEV_PORT } = require('../gulpfile.js/config/server');
const { srcView, output } = require('../gulpfile.js/config/directories');
const pugOptions = require('../gulpfile.js/config/pug');
const { renderErrorHTML } = require('../gulpfile.js/utils');

//____________________________________________
//                             SERVER VARIABLE
const app = express();

//____________________________________________
//                                SETUP SERVER
app.engine('pug', (path, options, callback) => {
  let opts = { ...pugOptions, ...options };

  const x = pug.renderFile(path, opts, (err, result) => {
    let data = result ? result : renderErrorHTML(err.stack);

    callback(null, data);
  });

  console.log(x);

  debugger
})

app.set('views', srcView);
app.set('view engine', 'pug');
app.use(express.static(output));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use('/', route);

console.log(process.env.isNoLocale);

//____________________________________________
//                                    USE PORT
const logPort = `----- Server listen at ${DEV_PORT} -----`;
// app.listen(DEV_PORT, () => console.log(logPort));
