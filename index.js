'use strict'
let path = require('path')
let express = require('express')
let app = express()

// loading routers
let itenariesRoutes = require('./routes/itinerariesRoutes.js')

// mouting our routers
app.use('/itineraries', itenariesRoutes)

// loading body parser
let bodyParser = require('body-parser')

app.get('/', function (req, res) {
  res.send('Hello Team')
})

// tell express to use body parser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// serving static files
app.use('/cdn', express.static('public'))

app.listen(3000)
console.log('Express server running on port 3000')
