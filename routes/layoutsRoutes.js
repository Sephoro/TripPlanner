'use strict'
let path = require('path')
let express = require('express')
let layoutsRoute = express.Router()

layoutsRoute.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'layouts.html'))
})

layoutsRoute.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'loggedIn.html'))
})

layoutsRoute.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'aboutUs.html'))
})

module.exports = layoutsRoute
