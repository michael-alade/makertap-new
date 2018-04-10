const axios = require('axios')
const campaignModel = require('../models/campaign.model')
const dotenv = require('dotenv')
dotenv.config()

var payload = {
  "SECKEY": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X", //use the secret key from the paybutton generated on the rave dashboard
};


const paymentVerify = (req, res, next) => {
  const body = Object.assign({}, req.body)
  const transaction = Object.assign({}, body.transactions[0])
  const flwRef = transaction.tx.flwRef
  const payload = {
    "SECKEY": process.env.RAVEPAY_SECRET,
    "flw_ref": flwRef
  }
  return axios.post(process.env.RAVEPAY_URL, payload)
  .then(response => {
    if (response.data.status === 'success') {
      console.log(response.data.data.amount, 'response.data.data.amount')
      if (response.data.data.amount === (body.campaignPrice + 8)) {
        if (response.data.data.tx_ref === req.params.campaignId) {
          return next()
        }
        return res.status(400).json({
          message: 'Payment verifications failed'
        })
      }
      return res.status(400).json({
        message: 'Payment verification failed'
      })
    }
    
  })
  .catch(err => {
    return res.status(400).json({
      err: err.message,
      message: 'Payment verification failed'
    })
  })
}

const twitterShareDone = (req, res) => {
  const campaignId = req.body.campaignId
  const userId = req.decoded._id
  const tweet = req.tweet
  return campaignModel.findByIdAndUpdate(campaignId, {
    $inc: {
      'campaignDetails.spots': -1
    },
    $push: {
      'campaignDetails.tweets': tweet,
      'campaignDetails.influencerIds': userId
    }
  })
  .then(campaign => {
    if (!campaign) {
      return res.status(404).json({
        message: 'Campaign not found'
      })
    }
    return res.status(200).json({
      message: 'Tweet sent',
      tweet
    })
  })
  .catch(err => {
    return res.status(500).json({
      message: 'Server error',
      err: err.message
    })
  })
}

const checkIfUserHasTweetedCampaign = (req, res, next) => {
  const userId = req.decoded._id
  const campaignId = req.body.campaignId
  return campaignModel
    .findOne({
      _id: campaignId,
      'campaignDetails.spots': { $gt : 0 },
      'campaignDetails.influencerIds': { $in: [userId] }
    })
    .then(campaign => {
      if (campaign) {
        return res.status(400).json({
          message: 'You have already tweeted about this product.'
        })
      }
      return next()
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error',
        err: err.message
      })
    })
}


module.exports = {
  paymentVerify,
  twitterShareDone,
  checkIfUserHasTweetedCampaign
}

