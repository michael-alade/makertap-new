const campaignController = require('../controllers/campaign.controller')
const authMiddleware = require('../middleware/auth.middleware')
const campaignMiddleware = require('../middleware/campaign.middleware')

module.exports = (router) => {
  router
    .route('/campaign')
    .get(
      authMiddleware.secureAccess,
      authMiddleware.sponsorOnly,
      campaignController.getUserCampaigns
    )
    .post(
      authMiddleware.secureAccess,
      authMiddleware.sponsorOnly,
      campaignController.create
    )
  
  router
    .route('/campaign/:campaignId')
    .get(
      authMiddleware.secureAccess,
      campaignController.getCampaign
    )
    .delete(
      authMiddleware.secureAccess,
      authMiddleware.sponsorOnly,
      campaignController.deleteCampaign
    )
  
  router
    .route('/campaign/payment-verify/:campaignId')
    .post(
      authMiddleware.secureAccess,
      authMiddleware.sponsorOnly,
      campaignMiddleware.paymentVerify,
      campaignController.paymentSuccess
    )
}
