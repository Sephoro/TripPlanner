'use strict'
let path = require('path')
let express = require('express')
let itineraries = express.Router()
let db = require('../data/database.js')
let pf = require('../public/scripts/itineraries/planFunctions')
let session = require('../models/sessions')
let logMaker = require('../models/planManager')

let arrayId = []
let firstPlanId = []
let planId = null

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
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'editPlan.html'))
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

            .query('INSERT INTO plans (itinerary_id, email,location,activities, duration, startDate, endDate) VALUES (' + itNum + ",'" + email + "','" + req.body.location + "','" + req.body.activities + "','" + duration.days + "','" + req.body.startDate + "','" + req.body.endDate + "')")
        })
      res.redirect('/plan')
    })
})

// RETURN THE CURRENT PLAN OF THE USER
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

            .query("SELECT * FROM plans WHERE email = '" + email + "' AND itinerary_id = " + itNum + ' ')
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

// RETURN ALL PLANS OF THE USER
itineraries.get('/api/myplans', function (req, res) {
  let email = session.getUser()

  db.pools
    .then((pool) => {
      return pool.request()

        .query("SELECT * FROM plans WHERE email = '" + email + "' ")
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

        .query('SELECT * FROM shareItineraries WHERE SharedWith = \'' + email + '\' OR SharedBy = \'' + email + '\' AND stat = 1')
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

// DELETING OF ITINERARIES
itineraries.post('/api/delplan', function (req, res) {
  let id = req.body.value
  console.log(id)
  db.pools.then((pool) => {
    return pool.request().query('DELETE FROM plans WHERE plan_id = ' + id + '')
  })
  res.redirect('/plan/myplans')
})

itineraries.post('/api/save', function (req, res) {
  // IS THE USER LOGGED IN?
  if (session.loggedIn()) {
    // SAVE THE ITINERARY
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
              .query("INSERT INTO itineraries (name,email,ItNum) VALUES ('" + req.body.itName + "','" + session.getUser() + "'," + itNum + ')')
          })
      })
    // UPDATE THE COUNTER
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
  let duration = pf.durationCalculator(req.body.eendDate, req.body.estartDate)

  db.pools
    .then((data) => {
      return data.request()
        .query('UPDATE plans SET location = \'' + req.body.elocation + '\', activities = \'' + req.body.eactivities + '\', startDate = \'' + req.body.estartDate + '\', endDate = \'' + req.body.eendDate + '\', duration = \'' + duration.days + '\' WHERE plan_id = ' + req.body.planid + ' ')
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
      if (logMaker.modified(plan.location, req.body.elocation)) {
        let modType = logMaker.modificationType(plan.location, req.body.elocation)
        changes.push(logMaker.getModification('location', modType, plan.elocation, req.body.elocation))
      }
      // Check activities changes
      if (logMaker.modified(plan.activities, req.body.eactivities)) {
        let modType = logMaker.modificationType(plan.activities, req.body.eactivities)
        changes.push(logMaker.getModification('activities', modType, plan.activities, req.body.eactivities))
      }
      // Check start date changes
      if (logMaker.modified(plan.startDate, req.body.estartDate)) {
        let modType = logMaker.modificationType(plan.startDate, req.body.estartDate)
        changes.push(logMaker.getModification('startDate', modType, plan.startDate, req.body.estartDate))
      }
      // Check end date changes
      if (logMaker.modified(plan.endDate, req.body.eendDate)) {
        let modType = logMaker.modificationType(plan.endDate, req.body.eendDate)
        changes.push(logMaker.getModification('endDate', modType, plan.endDate, req.body.eendDate))
      }

      changes.forEach(change => {
        // console.log(change)
        let columns = 'INSERT INTO plans_log (plan_id,contributor, mod_type, mod_date, field, new_field, old_field) '
        let values = ' VALUES (' + req.body.planid + ',\'' + email + '\',\'' + change.type + '\',\'' + logMaker.getDate() + '\',\'' + change.field + '\',\'' + change.new_ + '\',\'' + change.old + '\') '
        db.pools
          .then((data) => {
            return data.request()

              .query(columns + values)
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

// Return all the logs associated with the plan
itineraries.get('/api/ourplans/log/:id', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM plans_log WHERE plan_id = \'' + req.params.id + '\' ')
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

// Add a new stop to a shared itinerary
itineraries.post('/ourplans/api/add', function (req, res) {
  let duration = pf.durationCalculator(req.body.endDate, req.body.startDate)
  db.pools
    .then((pool) => {
      return pool.request()

        .query('INSERT INTO plans (itinerary_id, email,location,activities, duration, startDate, endDate) VALUES (' + req.body.itid + ',\'' + req.body.emailit + '\',\'' + req.body.location + '\',\'' + req.body.activities + '\',\'' + duration.days + '\',\'' + req.body.startDate + '\',\'' + req.body.endDate + '\')')
    })
    .then(function () {
      // res.redirect('/plan/ourplans')
    })
    .catch(err => {
      console.log(err)
    })

  // For logging the new addition

  let email = session.getUser()

  let columns = 'INSERT INTO itinerary_log (it_id, contributor, mod_type, mod_date, mod_value) '
  let values = ' VALUES (' + req.body.itid + ',\'' + email + '\',\'' + 'A' + '\',\'' + logMaker.getDate() + '\',\'' + req.body.location + '\' )'
  db.pools
    .then((data) => {
      return data.request()

        .query(columns + values)
    })
    .catch(err => {
      console.log(err)
    })
  res.redirect('/plan/ourplans')
})

// Return all the logs associated with the itinerary
itineraries.get('/api/ourplans/itlog/:id', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM itinerary_log  WHERE it_id = \'' + req.params.id + '\' ')
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

// FETCHING PRESSED ID OF THE PRESSED FORM....
itineraries.post('/api/editPlanForm', function (req, res) {
  planId = req.body.value
})

// RETURNING PLAN BY LOGGED IN EMAIL AND ID OF THE PRESSED FORM...
itineraries.get('/api/myplans_', function (req, res) {
  let email = session.getUser()
  let query = "SELECT * FROM plans WHERE email = '" + email + "' AND plan_id = '" + planId + "' "

  db.pools
    .then((pool) => {
      return pool.request()
        .query(query)
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

// EDITING ITINERARIES
itineraries.post('/api/editPlan', function (req, res) {
  let location = req.body.location
  let activities = req.body.activities
  let startDate = req.body.startDate
  let endDate = req.body.endDate

  let query = "UPDATE plans SET location = '" + location + "', activities = '" + activities + "', startDate = '" + startDate + "', endDate = '" + endDate + "' WHERE plan_id = '" + planId + "'"

  db.pools.then((pool) => {
    return pool.request().query(query)
  })
  res.redirect('/plan/myplans')
})

module.exports = itineraries
