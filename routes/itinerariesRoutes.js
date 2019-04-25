'use strict'
let path = require('path')
let express = require('express')
let itineraries = express.Router()

itineraries.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'plan.html'))
})

module.exports = itineraries
