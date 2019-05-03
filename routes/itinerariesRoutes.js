'use strict'
let path = require('path')
let express = require('express')
let itineraries = express.Router()
let db = require('../data/database.js')
let pf = require('../public/scripts/itineraries/planFunctions')
let fs = require('fs')
let counter = require('../data/it.json')

itineraries.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'itineraries', 'plan.html'))
})

itineraries.post('/api/plan', function (req, res) {
  let duration = pf.durationCalculator(req.body.endDate, req.body.startDate)

  db.pools
    .then((pool) => {
      return pool.request()

        .query('INSERT INTO plans (itinerary_id, email,location,activities, duration, startDate, endDate) VALUES (' + counter.counter + ',\'' + 'eliassepuru@gmail.com' + '\',\'' + req.body.location + '\',\'' + req.body.activities + '\',\'' + duration.days + '\',\'' + req.body.startDate + '\',\'' + req.body.endDate + '\')')
    })
  res.redirect('/plan')
})

itineraries.get('/api/myplan', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()

        .query('SELECT * FROM plans WHERE email = \'eliassepuru@gmail.com\' AND itinerary_id = ' + counter.counter + ' ')
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

itineraries.post('/api/save', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()
        .query('INSERT INTO itineraries (name,email,ItNum) VALUES (\'' + req.body.itName + '\',\'' + 'eliassepuru@gmail.com' + '\',' + counter.counter + ')')
    })

  let num = Number(counter.counter)
  num++
  counter.counter = num
  let a = { counter: num }
  fs.writeFile('data/it.json', JSON.stringify(a), (err) => {
    if (err) {
      console.log(err)
    }
  })
  res.redirect('/')
})

module.exports = itineraries
