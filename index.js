'use strict'
let path = require('path')
let express = require('express')
let app = express()

// loading routers
let itenariesRoutes = require('./routes/itinerariesRoutes.js')
let layoutsRoutes = require('./routes/layoutsRoutes')

// mouting our routers
app.use('/itineraries', itenariesRoutes)
app.use('/', layoutsRoutes)

// loading body parser
let bodyParser = require('body-parser')

// tell express to use body parser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// serving static files
app.use('/cdn', express.static('public'))
// Conditioning port to work on Azure as well
let port = process.env.PORT || 3000
app.listen(port)

console.log('Express server running on port', port)
