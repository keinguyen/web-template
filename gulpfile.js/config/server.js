const PORT = 4999;

module.exports = {
  STATIC_PORT: PORT,

  get DEV_PORT () {
    return this.STATIC_PORT + 1;
  },

  get DASHBOARD_PORT () {
    return this.STATIC_PORT - 1;
  },

  DEFAULT_LANG: 'en'
};
