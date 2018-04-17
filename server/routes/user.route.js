const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const campaignMiddleware = require('../middleware/campaign.middleware')

module.exports = (router) => {
  router
    .route('/auth/signup')
    .post(userController.signup)
  
  router
    .route('/auth/verify-email')
    .get(userController.verifyEmail)

  router
    .route('/auth/login')
    .post(userController.login)

  router
    .route('/auth/logout')
    .post(userController.logout)

  router
    .route('/auth/user')
    .get(authMiddleware.secureAccess, userController.getUser)

  router
    .route('/auth/connect/twitter/:userId')
    .post(authMiddleware.secureAccess, userController.connectTwitter)
  
  router
    .route('/user/twitter/share')
    .post(
      authMiddleware.secureAccess,
      campaignMiddleware.checkIfUserHasTweetedCampaign,
      userController.twitterShare,
      campaignMiddleware.twitterShareDone)
}
