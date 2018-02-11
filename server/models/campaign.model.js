var mongoose = require('./connect.js')
var Schema = mongoose.Schema

var campaignDetails = new Schema({
  productName: {
    type: String
  },
  productTagline: {
    type: String
  },
  productWebsite: {
    type: String
  },
  productDescription: {
    type: String
  },
  campaignCategory: {
    type: String
  },
  campaignPricing: {
    type: Object
  },
  slots: {
    type: Number,
    default: 0
  },
  assignedPublishers: {
    type: Array,
    default: []
  },
  transactions: {
    type: Array,
    default: []
  }
})

var campaign = new Schema({
  title: {
    type: String
  },
  status: {
    type: String,
    default: 'new'
  },
  campaignDetails: {
    type: campaignDetails
  },
  userId: {
    type: String
  }
})

module.exports = mongoose.model('Campaign', campaign)
