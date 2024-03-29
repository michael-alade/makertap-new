const jwt = require('jsonwebtoken')
const crypto = require('crypto-js')
const dotenv = require('dotenv')
const userModel = require('../models/user.model')
dotenv.config()

const verifyPassword = (hashedPassword) => {
  return crypto.AES.decrypt(hashedPassword, process.env.SECRET).toString(crypto.enc.Utf8)
}

const signup = (req, res) => {
  const body = req.body
  if (body.fullName && body.email && body.password && body.userType) {
    return userModel.findOne({
      email: body.email,
      username: body.username
    })
    .then(user => {
      if (user) {
        return res.status(409).json({
          status: 409,
          message: 'This user already exists.'
        })
      } else {
        body.verified = false
        body.password = crypto.AES.encrypt(body.password, process.env.SECRET)
        body.emailToken = crypto.HmacSHA1(body.email, process.env.SECRET)
        return userModel
          .create(body)
          .then(user => {
            // const nameArr = body.fullName.split(' ')
            // if (nameArr.length >= 2) {
            //   req.io.emit('snackbar', {
            //     action: 'joined',
            //     picture: `https://avatar.tobi.sh/241.svg?text=${nameArr[0][0]}${nameArr[1][0]}`,
            //     name: nameArr[0],
            //     time: Date.now()
            //   })
            // }
            // custom.sendMail([body.email], {
            //   from: 'no-reply@makertap.com',
            //   name: 'Makertap',
            //   subject: 'Email verification - Makertap',
            //   substitutions: {
            //     name: body.fullName,
            //     link: process.env.NODE_ENV === 'development' ? `http://makertap.staging:3000/verify-email?i=${body.emailToken}`
            //     : `https://makertap.com/verify-email?i=${body.emailToken}`,
            //     email: body.email,
            //     username: body.username
            //   }
            // }, 'emailVerify')
            return res.status(201).json({
              status: 201,
              message: 'Successfully registered'
            })
          })
          .catch(err => {
            if (err) {
              return res.status(409).json({
                err: err,
                message: 'Something went wrong'
              })
            }
          })
      }
    })
    .catch(err => {
      if (err) {
        return res.status(500).json({
          status: 409,
          error: err,
          message: 'Server error while creating user.'
        })
      }
    })
  } else {
    return res.status(400).json({
      status: 400,
      message: 'Fill in the required fields'
    })
  }
}

const verifyEmail = (req, res) => {
  const emailToken = req.query.emailToken
  return userModel
    .findOne({ emailToken: emailToken, verified: false })
    .then(user => {
      if (!user) {
        return res.status(400).json({
          message: 'Email has already been verified'
        })
      }
      return userModel
        .update({ verified: true, emailToken: '' })
        .then(update => {
          return res.status(200).json({
            message: 'Email verified'
          })
        })
    })
}

const login = (req, res) => {
  const body = req.body
  return userModel
    .findOne({ email: body.email })
    .then(user => {
      if (!user || body.password !== verifyPassword(user.password)) {
        return res.status(400).json({
          message: 'Email or password is incorrect'
        })
      }
      if (!user.verified) {
        return res.status(400).json({
          message: 'Please verify your email address. An email has been sent to your inbox.'
        })
      }
      const token = jwt.sign({
        _id: user._id,
        userType: user.userType,
      }, process.env.SECRET)
      return res.status(200).json({
        _id: user._id,
        message: 'Successfully logged in.',
        token: {
          accessToken: token
        }
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error: Something went wrong'
      })
    })
}

const logout = (req, res) => {
  res.clearCookie('mktoken')
  return res.redirect('/')
}

const getUser = (req, res) => {
  const userId = req.decoded._id
  return userModel
    .findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      let response = Object.assign({}, {
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        scope: [user.userType],
        mediumUsername: user.userType === 'publisher' ? user.mediumUsername : null,
        verified: user.verified
      })
      return res.status(200).json({
        user: response
      })
    })
    .catch(err => {
      return res.status(500).json({
        err: err.message,
        message: 'Server error: User not found',
        err: err.message
      })
    })
}

module.exports = {
  signup,
  login,
  logout,
  verifyEmail,
  getUser
}
