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
  spots: {
    type: Number,
    default: 0
  },
  influencerIds: {
    type: Array,
    default: []
  },
  tweets: {
    type: Array,
    default: []
  },
  transactions: {
    type: Array,
    default: []
  },
  submittedDate: {
    type: Date,
  }
})

var analytics = new Schema({
  totalClicks: {
    type: Number,
    default: 0
  },
  impressions: {
    type: Array,
    default: []
  }
})

// var settings = new Schema({
//   notifications:
// })

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
  analytics: {
    type: analytics,
    default: {
      totalClicks: 0,
      impressions: []
    },
  },
  shortUrl: {
    type: String,
    default: ''
  },
  // settings: {},
  cleanUrl: {
    type: String,
    default: ''
  },
  userId: {
    type: String
  }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Campaign', campaign)
