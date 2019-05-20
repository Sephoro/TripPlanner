'use strict'
let path = require('path')
let express = require('express')
let itineraries = express.Router()
let db = require('../data/database.js')
let pf = require('../public/scripts/itineraries/planFunctions')
let session = require('../models/sessions')
let logMaker = require('../models/planManager')

itineraries.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'plan.html'))
})

itineraries.get('/myplans', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'myplans.html'))
})

itineraries.get('/ourplans', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'ourplans.html'))
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
// For shared itineraries
itineraries.get('/api/ourplans', function (req, res) {
  let email = session.getUser()

  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM shareItineraries WHERE SharedWith = \'' + email + '\' AND stat = 1')
    })
    .then(results => {
      let sharedPlans = results.recordset
      // To plans shared with the user
      let plans = []

      // No plans?
      if (sharedPlans.length === 0) {
        res.send([])
      } else {
        // Send each plan shared with the user
        for (let i = 0; i < sharedPlans.length; i++) {
          db.pools
            .then((pool) => {
              return pool.request()

                .query('SELECT * FROM plans WHERE itinerary_id = ' + sharedPlans[i].ItineraryID + ' ')
            })
            .then(results => {
              plans.push(results.recordset)
              // Send the plans when the last plan is pushed into the array
              if (i === sharedPlans.length - 1) {
                res.send(plans)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    })
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

// Getting contributors
itineraries.get('/api/shared/:id', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM shareItineraries WHERE ItineraryID = \'' + req.params.id + '\' AND stat = 1')
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

itineraries.post('/myplans/api/share', function (req, res) {
  // Indicate on the database if someone has gotton an invite

  db.pools
    .then((data) => {
      return data.request()
        .query('INSERT INTO shareItineraries (SharedBy, SharedWith, ItineraryID) VALUES (\'' + session.getUser() + '\',\'' + req.body.email_inivte + '\',\'' + req.body.itinerarieID + '\')')
    })
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

// Edit a shared plan

itineraries.post('/ourplans/api/edit', function (req, res) {
  let duration = pf.durationCalculator(req.body.endDate, req.body.startDate)

  db.pools
    .then((data) => {
      return data.request()
        .query('UPDATE plans SET location = \'' + req.body.location + '\', activities = \'' + req.body.activities + '\', startDate = \'' + req.body.startDate + '\', endDate = \'' + req.body.endDate + '\', duration = \'' + duration.days + '\' WHERE plan_id = ' + req.body.planid + ' ')
    })
    .then(function () {
      // res.redirect('/plan/ourplans')
    })
    .catch(err => {
      /* res.send({
        Error: err
      }) */
      console.log(err)
    })

  // For generating logs for each plan

  let changes = []
  let email = session.getUser()

  db.pools
    .then((data) => {
      return data.request()
        .query('SELECT * FROM plans WHERE plan_id = ' + req.body.planid + ' ')
    })
    .then(results => {
      let plan = results.recordset[0]
      // Check location change
      if (logMaker.modified(plan.location, req.body.location)) {
        let modType = logMaker.modificationType(plan.location, req.body.location)
        changes.push(logMaker.getModification('location', modType, plan.location, req.body.location))
      }
      // Check activities changes
      if (logMaker.modified(plan.activities, req.body.activities)) {
        let modType = logMaker.modificationType(plan.activities, req.body.activities)
        changes.push(logMaker.getModification('activities', modType, plan.activities, req.body.activities))
      }
      // Check start date changes
      if (logMaker.modified(plan.startDate, req.body.startDate)) {
        let modType = logMaker.modificationType(plan.startDate, req.body.startDate)
        changes.push(logMaker.getModification('startDate', modType, plan.startDate, req.body.startDate))
      }
      // Check end date changes
      if (logMaker.modified(plan.endDate, req.body.endDate)) {
        let modType = logMaker.modificationType(plan.endDate, req.body.endDate)
        changes.push(logMaker.getModification('endDate', modType, plan.endDate, req.body.endDate))
      }

      changes.forEach(change => {
        // console.log(change)
        let columns = 'INSERT INTO plans_log (plan_id,contributor, mod_type, mod_date, field, new_field, old_field) '
        let values = ' VALUES (' + req.body.planid + ',\'' + email + '\',\'' + change.type + '\',\'' + logMaker.getDate() + '\',\'' + change.field + '\',\'' + change.new_ + '\',\'' + change.old + '\') '
        db.pools
          .then((data) => {
            return data.request()

              .query(columns + values) // 'INSERT INTO plans_logs (plan_id,, ItineraryID) VALUES (\'' + session.getUser() + '\',\'' + req.body.email_inivte + '\',\'' + req.body.itinerarieID + '\')')
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
    .catch(err => {
      /* res.send({
        Error: err
      }) */
      console.log(err)
    })
  res.redirect('/plan/ourplans')
})

module.exports = itineraries
