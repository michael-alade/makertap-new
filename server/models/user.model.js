const mongoose = require('./connect.js')
const paymentModel = require('./payment.model')
var Schema = mongoose.Schema

var user = new Schema({
  fullName: {
    type: String
  },
  userType: {
    type: String
  },
  twitterDetails: {
    type: Object,
    default: null
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  emailToken: {
    type: String
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('User', user)