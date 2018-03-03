const campaignModel = require('./models/campaign.model')

module.exports = (sockets, io) => {
  sockets.on('acceptRequest', (payload) => {
    const campaignId = payload.campaignId
    const data = {
      userId: payload.userId,
      status: 'accepted',
      articleLink: ''
    }
    campaignModel.findByIdAndUpdate(campaignId, {
      $inc: { 'campaignDetails.slots': -1 },
      $push: {
        'campaignDetails.assignedPublishers': data,
        'campaignDetails.publisherIds': payload.userId
      }
    }).then(campaign => {
      if (!campaign) {
        return io.emit(`request-success-${payload.userId}-${campaignId}`, {
          status: false,
          campaignId
        })
        return
      }
      io.emit('request-refresh')
      return io.emit(`request-success-${payload.userId}-${campaignId}`, {
        status: true,
        campaignId
      })
    })
  })

  sockets.on('finish-request', (payload) => {
    const campaignId = payload.campaignId
  })
}