'use strict'
let express = require('express')
let app = express()
const sgMail = require('@sendgrid/mail')
let nodemailer = require('nodemailer')
require('dotenv').config({ path: '.env' })

// loading routers
let itenariesRoutes = require('./routes/itinerariesRoutes.js')
let profileRoutes = require('./routes/profileRoutes.js')
let signuproutes = require('./routes/accountRoutes.js')
let layoutsRoutes = require('./routes/layoutsRoutes')
// let session = require('express-session')

// loading body parser
let bodyParser = require('body-parser')

// tell express to use body parser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// TODO store in .env
// app.use(session({ secret: 'eslbr1000t', resave: false, saveUninitialized: true }))

// mouting our routers
app.use('/itineraries', itenariesRoutes)
app.use('/account', signuproutes)
app.use('/g', signuproutes)
app.use('/go', signuproutes)
app.use('/', layoutsRoutes)
app.use('/plan', itenariesRoutes)
app.use('/profile', profileRoutes)

// serving static files
app.use('/cdn', express.static('public'))
// Conditioning port to work on Azure as well
let port = process.env.PORT || 3000
app.listen(port)

console.log('Express server running on port', port)
/*
var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'groupbotlhale@gmail.com',
    pass: 'aswedeal3007'
  }
})

var mailOptions = {
  from: 'MyTripPlanner <no-reply@mytripplanner.com>',
  to: 'eliassepuru@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy    ajjsjsjj!'
}

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
*/

/*
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const msg = {
  to: 'groupbotlhale@gmail.com',
  from: 'noreply@mytripplanner.com',
  subject: 'ELEN4010 Submission',
  text: 'This week MyBroadband partnered with Afristay to offer you a great prize – a 2-night',
  html: '<p> Hi Boikanyo </p> <br> </br>  <br> </br>  <p> Make it easy to do anywhere, even with Node.js </p> <p> This week MyBroadband partnered with Afristay to offer you a great prize – a 2-night</p>  <br> </br> <p> Regards TripPlanner Team </p> '
}
sgMail.send(msg)
  .catch(err => {
    console.log(err)
  })
*/
