'use strict'
let path = require('path')
let express = require('express')
let itineraries = express.Router()
let db = require('../data/database.js')
let pf = require('../public/scripts/itineraries/planFunctions')
let session = require('../models/sessions')

itineraries.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'plan.html'))
})

itineraries.get('/myplans', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'myplans.html'))
})

itineraries.get('/delplan', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'delplan.html'))
})

itineraries.get('/editplan', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'edit.html'))
})

itineraries.post('/api/plan', function (req, res) {
  let duration = pf.durationCalculator(req.body.endDate, req.body.startDate)
  let email = session.getUser()
  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM numIt')
    })
    .then(result => {
      let itNum = result.recordset[0].counter
      console.log(email, itNum)
      db.pools
        .then((pool) => {
          return pool.request()

            .query('INSERT INTO plans (itinerary_id, email,location,activities, duration, startDate, endDate) VALUES (' + itNum + ',\'' + email + '\',\'' + req.body.location + '\',\'' + req.body.activities + '\',\'' + duration.days + '\',\'' + req.body.startDate + '\',\'' + req.body.endDate + '\')')
        })
      res.redirect('/plan')
    })
})

// Return the current plan of the user
itineraries.get('/api/myplan', function (req, res) {
  let email = session.getUser()

  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM numIt')
    })
    .then(result => {
      let itNum = result.recordset[0].counter
      db.pools
        .then((pool) => {
          return pool.request()

            .query('SELECT * FROM plans WHERE email = \'' + email + '\' AND itinerary_id = ' + itNum + ' ')
        })
        .then(results => {
          res.send(results.recordset)
        })
        .catch(err => {
          res.send({
            Error: err
          })
        })
    })
})
// Return all the plans of the user
itineraries.get('/api/myplans', function (req, res) {
  let email = session.getUser()

  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM plans WHERE email = \'' + email + '\' ')
    })
    .then(results => {
      res.send(results.recordset)
    })
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

// Editing the Itineraries


// Deleting of Itineraries
itineraries.post('/api/delplan', function (req, res) {
  let id = req.body.value
  // console.log(loc)
  db.pools.then((pool) => {
    return pool.request().query('DELETE FROM plans WHERE plan_id = ' + id + '')
  })
  res.redirect('/plan/myplans')
})

itineraries.post('/api/save', function (req, res) {
  // Is the user logged in?
  if (session.loggedIn()) {
    // Save the iteninary
    db.pools
      .then((pool) => {
        return pool.request()

          .query('SELECT * FROM numIt')
      })
      .then(result => {
        let itNum = result.recordset[0].counter
        db.pools
          .then((pool) => {
            return pool.request()
              .query('INSERT INTO itineraries (name,email,ItNum) VALUES (\'' + req.body.itName + '\',\'' + session.getUser() + '\',' + itNum + ')')
          })
      })
    // Update counter
    db.pools
      .then((pool) => {
        return pool.request()

          .query('SELECT * FROM numIt')
      })
      .then(result => {
        let itNum = result.recordset[0].counter
        let newIt = itNum + 1
        db.pools
          .then((pool) => {
            return pool.request()
              .query('UPDATE numIt SET counter = ' + newIt + 'WHERE counter = ' + itNum + ' ')
          })
      })

    res.redirect('/plan/myplans')
  } else {
    res.send('Itineraries can only be saved if you are logged in....Log in if you have an account, sign up or Print the itinary instead by Ctrl+p')
  }
})

module.exports = itineraries
