let nodemailer = require('nodemailer')
require('dotenv').config({ path: '.env' })

let sendEmail = function (email, subject, text) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS
    }
  })

  let mailOptions = {
    from: 'MyTripPlanner < ' + process.env.NODE_MAILER_USER + '>',
    to: email,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = {

  sendEmail: sendEmail

}
