var customEmails = require('./emails')
var sengrid = require('@sendgrid/mail')
sengrid.setApiKey('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')

function sendMail(emails, msg, type) {
  msg.html = customEmails[type]
  for (var i = 0; i < emails.length; i++) {
    if (typeof emails[i] === 'object') {
      msg.subject = 'Your mission ' + emails[i].firstName + ', should you choose to accept it - Makertap'
      msg.substitutions.unsubscribe = 'https://makertap.com/email/unsubscribe/' + emails[i].userId
      msg.to = emails[i].email
    } else {
      msg.to = emails[i]
    }
    sengrid.send(msg)
  }
}

module.exports = {
  sendMail
}