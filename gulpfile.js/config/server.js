const PORT = 4999;

module.exports = {
  PROD_PORT: 8080,
  STATIC_PORT: PORT,

  get DEV_PORT () {
    return this.STATIC_PORT + 1;
  },

  get DASHBOARD_PORT () {
    return this.STATIC_PORT - 1;
  },

  get PROD_DASHBOARD_PORT () {
    return this.PROD_PORT - 1;
  },

  DEFAULT_LANG: 'en'
};
