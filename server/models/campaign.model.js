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
  productThumbnail: {
    type: String
  },
  productCoverPhoto: {
    type: String
  },
  productDescription: {
    type: String
  },
  campaignCategory: {
    type: String
  },
  campaignPrice: {
    type: Number
  },
  slots: {
    type: Number,
    default: 0
  },
  publisherIds: {
    type: Array,
    default: []
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
  shortUrl: {
    type: String,
    default: ''
  },
  cleanUrl: {
    type: String,
    default: ''
  },
  userId: {
    type: String
  }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Campaign', campaign)
