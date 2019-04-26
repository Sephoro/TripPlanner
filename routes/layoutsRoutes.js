'use strict'
let path = require('path')
let express = require('express')
let layoutsRoute = express.Router()

// home page
layoutsRoute.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'layouts.html'))
})

// log-in home page
layoutsRoute.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'loggedIn.html'))
})

// terms and conditions page
layoutsRoute.get('/tcs', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'terms_conditions.html'))
})

layoutsRoute.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'aboutUs.html'))
})

module.exports = layoutsRoute
