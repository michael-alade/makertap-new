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

const requestPayout = (req, res) => {
  const userId = req.decoded._id
  const amount = req.body.amount
  return paymentModel
    .findOneAndUpdate({
      user: userId,
      $inc: {
        totalAmountAvailable: -amount,
        totalWithdrawed: amount
      },
      $push: {
        withdrawalTransactions: {
          status: 'pending',
          amount: Number(amount),
          submitDate: Date.now()
        }
      }
    })
    .then(wallet => {
      if (!wallet) {
        throw new Error('Wallet not found')
      }
      return res.status(200).json({
        wallet,
        message: 'Payout request was successfull',
        status: 200
      })
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message,
        status: 500
      })
    })
}

module.exports = {
  getUserWallet,
  updatePaymentDetails,
  requestPayout
}