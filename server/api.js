const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

app.use(bodyParser({ extended: false }))

routes(app)

module.exports = app
