const paymentModel = require('../models/payment.model')

const checkIfWithdrawalIsValid = (req, res, next) => {
  const userId = req.decoded._id
  const amount = req.body.amount
  if (!Number(amount)) {
    return res.status(400).json({
      message: 'Invalid amount.',
      status: 400
    })
  } else if (Number(amount) < 4) {
    return res.status(400).json({
      message: 'Withdrawal amount must be equal or greater than $4',
      status: 400
    })
  } else {
    return paymentModel
      .findOne({
        user: userId,
      })
      .then(wallet => {
        if (Number(amount) > wallet.totalAmountAvailable) {
          return res.status(400).json({
            message: 'Withdrawal amount exceeding wallet balance.',
            status: 400
          })
        }
        return next()
      })
      .catch(err => {
        return res.status(500).json({
          message: err.message,
          status: 500
        })
      })
  }
}


module.exports = {
  checkIfWithdrawalIsValid
}
