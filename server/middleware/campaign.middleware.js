const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()

var payload = {
  "SECKEY": "FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X", //use the secret key from the paybutton generated on the rave dashboard
};


const paymentVerify = (req, res, next) => {
  const body = Object.assign({}, req.body)
  const transaction = Object.assign({}, body.transactions[0])
  const flwRef = transaction.tx.flwRef
  const payload = {
    "SECKEY": process.env.RAVEPAY_SECRET,
    "flw_ref": flwRef
  }
  return axios.post(process.env.RAVEPAY_URL, payload)
  .then(response => {
    if (response.data.status === 'success') {
      if (response.data.data.amount === body.campaignPrice + 15) {
        if (response.data.data.tx_ref === req.params.campaignId) {
          return next()
        }
        return res.status(400).json({
          message: 'Payment verifications failed'
        })
      }
      return res.status(400).json({
        message: 'Payment verification failed'
      })
    }
    
  })
  .catch(err => {
    return res.status(400).json({
      err: err.message,
      message: 'Payment verification failed'
    })
  })
}


module.exports = {
  paymentVerify
}

