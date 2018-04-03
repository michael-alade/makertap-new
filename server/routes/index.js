const user = require('./user.route')
const campaign = require('./campaign.route')
const payment = require('./payment.route')

module.exports = (router) => {
  user(router)
  campaign(router)
  payment(router)
}
