const paymentController = require('../controllers/payment.controller')
const authMiddleware = require('../middleware/auth.middleware')

module.exports = (router) => {
  router
    .route('/user/wallet')
    .get(authMiddleware.secureAccess, paymentController.getUserWallet)

  router
    .route('/user/wallet/update')
    .put(authMiddleware.secureAccess, authMiddleware.influencerOnly, paymentController.updatePaymentDetails)
}
