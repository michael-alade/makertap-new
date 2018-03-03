const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const secureAccess = (req, res, next) => {
  let token
  const auth = req.headers.authorization ? req.headers.authorization.split(' ') : null
  if (!auth) {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
  token = auth[1]
  const decoded = jwt.verify(token, process.env.SECRET)
  if (!decoded) {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
  req.decoded = decoded
  return next()
}

const sponsorOnly = (req, res, next) => {
  const userType = req.decoded.userType
  if (userType !== 'sponsor') {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
  return next()
}

const influencerOnly = (req, res, next) => {
  const userType = req.decoded.userType
  if (userType !== 'influencer') {
    return res.status(401).json({
      message: 'Not authorized'
    })
  }
  return next()
}

module.exports = {
  secureAccess,
  sponsorOnly,
  influencerOnly
}