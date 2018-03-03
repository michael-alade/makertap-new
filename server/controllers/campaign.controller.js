const cloudinary = require('cloudinary')
const campaignModel = require('../models/campaign.model')
cloudinary.config({
  cloud_name: 'makertap',
  api_key: '692474461884365',
  api_secret: 'oad5-Tra5epp3DFkZLdggL_7LW4'
})

const create = (req, res) => {
  const userId = req.decoded._id
  const body = req.body

  if (!body.title) {
    return res.status(400).json({
      message: 'Failed: Add a title'
    })
  }
  return campaignModel
    .create(Object.assign({}, body, { userId }))
    .then(campaign => {
      return res.status(201).json({
        message: 'Campaign created'
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error'
      })
    })
}

const deleteCampaign = (req, res) => {
  const campaignId = req.params.campaignId
  const userId = req.decoded._id
  return campaignModel
    .findOneAndRemove({
      userId: userId,
      _id: campaignId
    })
    .then(campaign => {
      if (!campaign) {
        return res.status(404).json({
          message: 'Campaign was not found.'
        })
      }
      return res.status(200).json({
        message: 'Successfully deleted.'
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error'
      })
    })
}

const getCampaign = (req, res) => {
  const campaignId = req.params.campaignId
  return campaignModel
    .findById(campaignId)
    .then(campaign => {
      if (!campaign) {
        return res.status(404).json({
          message: 'Campaign was not found.'
        })
      }
      return res.status(200).json({
        campaign
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error'
      })
    })
}

const getCampaignWithShortUrl = (req, res) => {
  const cleanUrl = req.params.cleanUrl
  return campaignModel
    .findOne({
      cleanUrl
    })
    .then(campaign => {
      if (!campaign) {
        return res.status(404).json({
          message: 'Campaign not found'
        })
      }
      return res.status(200).json({
        campaign
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error'
      })
    })
}

const getUserCampaigns = (req, res) => {
  const userId = req.decoded._id
  return campaignModel
    .find({ userId })
    .then(campaigns => {
      return res.status(200).json({
        campaigns
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error'
      })
    })
}

const getPaidCampaigns = (req, res) => {
  const userId = req.decoded._id
  return campaignModel
    .find({
      status: 'paid',
      // 'campaignDetails.slots': { $gt : 0 },
      $nor: [{
        'campaignDetails.publisherIds': { $in: [userId] }
      }]
    })
    .sort({ updatedAt: -1 })
    .then(campaigns => {
      if (!campaigns) {
        return res.status(404).json({
          message:'Not found'
        })
      }
      return res.status(200).json({
        campaigns
      })
    })
    .catch(err => {
      console.log(err.message, 'error')
      return res.status(500).json({

        message: 'Server error'
      })
    })
}

const paymentSuccess = (req, res) => {
  const userId = req.decoded._id
  const campaignId = req.params.campaignId
  const body = req.body
  return campaignModel
    .findById(campaignId)
    .then(campaign => {
      if (!campaign) {
        return res.status(404).json({
          message: 'Campaign not found'
        })
      }

      const lastFive = campaignId.substr(campaignId.length - 5)
      const cleanUrl = `${body.productName.replace(' ', '-').toLowerCase()}-${lastFive}`
      campaign.status = 'paid'
      campaign.cleanUrl = cleanUrl
      campaign.shortUrl = process.env.NODE_ENV === 'development' ?
        `https://localhost:3000/r/${cleanUrl}` : `https://makertap.com/r/${cleanUrl}`
      campaign.campaignDetails = Object.assign({}, body)

      return campaign.save().then(() => {
        req.io.emit('request-refresh')
        return res.status(200).json({
          message: 'Payment success'
        })
      }).catch(err => {
        return res.status(500).json({
          err: err.message,
          message: 'Server error'
        })
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error'
      })
    })
}

const acceptedRequests = (req, res) => {
  const userId = req.decoded._id

  return campaignModel
    .find({
      'campaignDetails.publisherIds': {
        $in: [userId]
      }
    })
    .sort({ updatedAt: -1 })
    .then(campaigns => {
      if (!campaigns) {
        return res.status(404).json({
          message: 'Campaigns not found'
        })
      }
      return res.status(200).json({
        campaigns
      })
    })
    .catch(err => {
      return res.status(500).json({
        err: err.message,
        message: 'Server error'
      })
    })
}

const uploadImage = (req, res) => {
  const image = req.body.image
  const field = req.body.formField
  const imageOptions = req.body.options
  const campaignId = req.params.campaignId
  return campaignModel.findById(campaignId)
    .then(campaign => {
      if (!campaign) {
        return res.status(404).json({
          message: 'Campaign not found'
        })
      }
      return cloudinary.v2.uploader.upload(image, imageOptions,
        (err, cloudinaryRes) => {
          if (err) {
            return res.status(500).json({
              err: err,
              message: 'Something wrong with the upload'
            })
          }
          return res.status(201).json({
            message: 'Uploaded',
            url: cloudinaryRes.secure_url
          })
      })
    })
    .catch(err => {
      return res.status(500).json({
        err: err.message,
        message: 'Server error'
      })
    })
}

module.exports = {
  create,
  deleteCampaign,
  getCampaign,
  paymentSuccess,
  getPaidCampaigns,
  acceptedRequests,
  uploadImage,
  getUserCampaigns,
  getCampaignWithShortUrl
}
