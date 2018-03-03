var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var payment = new Schema({
  user: {
    type: Object
  },
  transactions: {
    type: Array,
    default: []
  },
  totalAmountAvailable: {
    type: Number,
    default: 0
  },
  totalWithdrawed: {
    type: Number,
    default: 0
  }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Payment', payment)
