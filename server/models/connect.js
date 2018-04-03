const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
if (process.env.NODE_ENV === 'development') {
  mongoose.connect('mongodb://localhost/maker-tap')
}
if (process.env.NODE_ENV === 'production') {
  mongoose.connect('mongodb://localhost/maker-tap')
}
if (process.env.NODE_ENV === 'staging') {
  mongoose.connect('mongodb://kolafas:Akinyemi1@ds115110.mlab.com:15110/kola-bot')
}

mongoose.Promise = require('bluebird')

module.exports = mongoose
