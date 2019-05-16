const compression = require('compression');

const server = require('./server');

module.exports = {
  port: server.DEV_PORT,
  proxy: `http://localhost:${server.STATIC_PORT}`,
  ui: {
    port: server.DASHBOARD_PORT
  },
  open: 'local',
  browser: 'chrome.exe',
  ghostMode: false,
  logPrefix: 'SYNC',
  middleware: [
    compression()
  ]
};
