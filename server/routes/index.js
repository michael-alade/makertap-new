const user = require('./user.route')
const campaign = require('./campaign.route')

module.exports = (router) => {
  user(router)
  campaign(router)
}
