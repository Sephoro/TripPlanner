'use strict'
let path = require('path')
let express = require('express')
let db = require('../data/database')
let session = require('../models/sessions.js')

let layoutsRoute = express.Router()

layoutsRoute.get('/', function (req, res) {
  if (!session.loggedIn()) {
    // not logged in
    res.sendFile(path.join(__dirname, '../views', 'layouts', 'layouts.html'))
  } else {
    // If logged in
    res.sendFile(path.join(__dirname, '../views', 'layouts', 'loggedIn.html'))
  }
})

// terms and conditions page
layoutsRoute.get('/tcs', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'terms_conditions.html'))
})

// about page
layoutsRoute.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'layouts', 'aboutUs.html'))
})

// In between logging out
layoutsRoute.get('/api/logout', function (req, res) {
  session.loggedOut()
  res.redirect('/')
})

// In between accesing profile

layoutsRoute.get('/api/profile', function (req, res) {
  if (session.loggedIn()) {
    res.redirect('/profile')
  } else {
    res.redirect('/account/login')
  }
})

layoutsRoute.get('/api/database', function (req, res) {
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

layoutsRoute.get('/api/shared', function (req, res) {
  let email = session.getUser()

  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM shareItineraries WHERE SharedWith = (\'' + email + '\')')
    })
    .then(result => {
      res.send(result.recordset)
    })
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

layoutsRoute.post('/api/notifications', function (req, res) {
  let email = session.getUser()
  let stat = 0

  if (req.body.status === 'a') {
    stat = 1
  }

  db.pools
    .then((pool) => {
      return pool.request()

        .query('UPDATE shareItineraries SET stat = ' + stat + ' WHERE SharedWith = \'' + email + '\' AND ItineraryID = ' + req.body.itID + ' ')
    })
    .then(results => {
      if (stat === 1) {
        res.send('plan/myplans')
      } else {
        res.send('/')
      }
    })
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

module.exports = layoutsRoute
