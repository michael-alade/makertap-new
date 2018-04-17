var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var payment = new Schema({
  user: {
    type: String
  },
  transactions: {
    type: Array,
    default: []
  },
  currency: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  totalAmountAvailable: {
    type: Number,
    default: 0
  },
  withdrawalTransactions: {
    type: Array,
    default: []
  },
  totalWithdrawed: {
    type: Number,
    default: 0
  }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Payment', payment)
