const campaignModel = require('../models/campaign.model')

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

module.exports = {
  create,
  deleteCampaign,
  getCampaign,
  getUserCampaigns
}
