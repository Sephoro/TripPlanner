'use strict'
let path = require('path')
let express = require('express')
let it = express.Router()

it.get('/', function (req, res) {
  res.send('Hello welcome')
})

it.get('/plan', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'itineraries.html'))
})
module.exports = it
