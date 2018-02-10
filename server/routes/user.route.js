const userController = require('../controllers/user.controller')
const authMiddleware = require('../middleware/auth.middleware')

module.exports = (router) => {
  router
    .route('/auth/signup')
    .post(userController.signup)
  
  router
    .route('/auth/verify-email')
    .post(userController.verifyEmail)

  router
    .route('/auth/login')
    .post(userController.login)

  router
    .route('/auth/logout')
    .post(userController.logout)

  router
    .route('/auth/user')
    .get(authMiddleware.secureAccess, userController.getUser)
}
