const {
  port: PORT
} = require('./server')

module.exports = {
  port     : PORT.web,
  proxy    : `http://localhost:${PORT.server}`,
  ui       : { port: PORT.web + 1 },
  open     : 'local',
  browser  : 'chrome.exe',
  ghostMode: false,
  logPrefix: 'SYNC'
}
