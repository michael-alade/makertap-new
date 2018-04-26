const userController = require('../controllers/user.controller')
const axios = require('axios')
const authMiddleware = require('../middleware/auth.middleware')
const campaignMiddleware = require('../middleware/campaign.middleware')

module.exports = (router) => {
  router
    .route('/auth/signup')
    .post((req, res, next) => {
      const data = Object.assign({},req.body, { email: 'nill', password: 'nill' })
      return axios.post('https://pushmore.io/webhook/BqjrDY1iLyith6hn1aduWhRY', `New user signup ${data.fullName} as ${data.userType}`)
        .then(() => {
          return next()
        })
        .catch(() => {
          return next()
        })
    }, userController.signup)
  
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
