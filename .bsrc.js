module.exports = {
  defaultLanguage: 'en',
  serverPort: 4999,
  port: 5000,
  proxy: `http://localhost:4999`,
  ui: {
    port: 5001
  },
  // open: 'local',
  open: false,
  ghostMode: false,
  notify: false,
  logLevel: 'silent',
  logPrefix: 'SYNC'
}
