'use strict'
let path = require('path')
let express = require('express')
let app = express()

// loading body parser
let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// loading routers
let itenariesRoutes = require('./routes/itinerariesRoutes.js')
let profileRoutes = require('./routes/profileRoutes.js')

// mouting our routers
app.use('/itineraries', itenariesRoutes)
app.use('/profile', profileRoutes)

app.get('/', function (req, res) {
  res.send('Hello Team')
})

// serving static files
app.use('/cdn', express.static('public'))
// Conditioning port to work on Azure as well
let port = process.env.PORT || 3000
app.listen(port)

console.log('Express server running on port', port)