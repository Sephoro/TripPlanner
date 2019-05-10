'use strict'
let path = require('path')
let express = require('express')
let db = require('../data/database')
let session = require('../models/sessions.js')

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

// about page
layoutsRoute.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'aboutUs.html'))
})

layoutsRoute.get('/api/logout', function (req, res) {
  session.loggedOut()
  res.redirect('/')
})

layoutsRoute.get('/database', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM users')
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

module.exports = layoutsRoute
