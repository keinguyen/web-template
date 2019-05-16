const PORT = 4999;

module.exports = {
  STATIC_PORT: PORT,

  get DEV_PORT () {
    return this.dev + 1;
  },

  get DASHBOARD_PORT () {
    return this.dev - 1;
  }
};
