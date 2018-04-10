const paymentModel = require('../models/payment.model')

const getUserWallet = (req, res) => {
  const userId = req.decoded._id
  return paymentModel
    .findOne({ user: userId })
    .then(wallet => {
      const total = wallet.transactions.reduce((acc, trans) => {
        if (trans.amount) {
          const amount = trans.amount
          return acc + amount
        }
        return acc + 0
      }, 0)
      return res.status(200).json({
        wallet: Object.assign({}, wallet._doc, { total })
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error',
        err: err.message
      })
    })
}

const updatePaymentDetails = (req, res) => {
  const userId = req.decoded._id
  const body = req.body
  return paymentModel
    .findOneAndUpdate({ user: userId }, {
      $set: {
        email: body.email,
        currency: body.currency
      }
    })
    .then(wallet => {
      if (wallet) {
        return res.status(200).json({
          message: 'Successfully updated.'
        })
      }
      return res.status(500).json({
        message: 'Server error: Not found',
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: 'Server error',
        err: err.message
      })
    })
}

module.exports = {
  getUserWallet,
  updatePaymentDetails
}