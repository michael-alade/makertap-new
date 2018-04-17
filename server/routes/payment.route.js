const paymentController = require('../controllers/payment.controller')
const paymentMiddleware = require('../middleware/payment.middleware')
const authMiddleware = require('../middleware/auth.middleware')

module.exports = (router) => {
  router
    .route('/user/wallet')
    .get(authMiddleware.secureAccess, authMiddleware.influencerOnly, paymentController.getUserWallet)

  router
    .route('/user/wallet/update')
    .put(authMiddleware.secureAccess, authMiddleware.influencerOnly, paymentController.updatePaymentDetails)

  router
    .route('/user/wallet/request-payout')
    .post(authMiddleware.secureAccess, authMiddleware.influencerOnly, paymentMiddleware.checkIfWithdrawalIsValid, paymentController.requestPayout)
}
