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
  mediumUsername: {
    type: String
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
})

user.post('save', (doc) => {
  const payment = new paymentModel({ user: doc._id })
  return payment.save()
})

module.exports = mongoose.model('User', user)