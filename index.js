'use strict'
let express = require('express')
let app = express()

// loading routers
let itenariesRoutes = require('./routes/itinerariesRoutes.js')
let profileRoutes = require('./routes/profileRoutes.js')
let signuproutes = require('./routes/accountRoutes.js')
let layoutsRoutes = require('./routes/layoutsRoutes')
//let session = require('express-session')

// loading body parser
let bodyParser = require('body-parser')

// tell express to use body parser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// TODO store in .env
//app.use(session({ secret: 'eslbr1000t', resave: false, saveUninitialized: true }))

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
