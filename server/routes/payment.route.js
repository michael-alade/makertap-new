const paymentController = require('../controllers/payment.controller')
const authMiddleware = require('../middleware/auth.middleware')

module.exports = (router) => {
  router
    .route('/user/wallet')
    .get(authMiddleware.secureAccess, paymentController.getUserWallet)
}
