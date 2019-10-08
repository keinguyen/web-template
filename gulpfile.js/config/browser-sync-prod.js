process.env.NODE_ENV = 'production';

const compression = require('compression');

const { output } = require('./directories');
const server = require('./server');

module.exports = {
  server: output,
  port: server.PROD_PORT,
  ui: {
    port: server.PROD_DASHBOARD_PORT
  },
  open: 'local',
  ghostMode: false,
  logPrefix: 'SYNC',
  middleware: [
    compression()
  ]
};
