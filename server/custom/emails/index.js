const fs = require('fs')
const path = require('path')

const broadcast = fs.readFileSync(path.join(__dirname, './broadcast.html'), 'utf8')
const emailVerify = fs.readFileSync(path.join(__dirname, './email-verify.html'), 'utf8')

module.exports = {
  broadcast,
  emailVerify
}
