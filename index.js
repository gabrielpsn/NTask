const express = require("express")
const consign = require("consign")

const app = express()

consign({verbose: false})
  .include("libs/config.js")
  .then("db.js")
  .then("auth.js")
  .then("libs/middlewares.js")
  .then("routes")
  .then("libs/boots.js")
  .into(app)

module.exports = app
