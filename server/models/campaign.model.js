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
    type: String
  },
  spots: {
    type: Number,
    default: 0
  },
  assignedPublishers: {
    type: Array
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
