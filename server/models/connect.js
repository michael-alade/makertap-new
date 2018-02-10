const mongoose = require('mongoose') 
mongoose.connect('mongodb://localhost/maker-tap')
mongoose.Promise = require('bluebird')

module.exports = mongoose
