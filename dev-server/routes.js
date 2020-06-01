const express = require('express')
const requireDir = require('require-dir')

const routes = requireDir('./routes')

const router = express.Router()

for (const key in routes) {
  if (Object.prototype.hasOwnProperty.call(routes, key)) {
    router.use('/', routes[key])
  }
}

module.exports = router
