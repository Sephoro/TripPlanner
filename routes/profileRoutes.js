'use strict'
let path = require('path')
let express = require('express')
let router = express.Router()
let db = require('../data/database')
let session = require('../models/sessions.js')
let profileManager = require('../models/profileManager')

router.get('/edit', function (req, res) {
  if (session.loggedIn()) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'edit.html'))
  } else {
    res.redirect('/account/login')
  }
})

router.get('/delete', function (req, res) {
  if (session.loggedIn()) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'delete.html'))
  } else {
    res.redirect('/account/login')
  }
})

router.get('/', function (req, res) {
  if (session.loggedIn()) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'profile.html'))
  } else {
    res.redirect('/account/login')
  }
})

// RESTful interface
router.get('/api/list', function (req, res) {
  db.pools
    .then((pool) => {
      let userEmail = session.getUser()
      return pool.request()

        .query('SELECT * FROM users WHERE email = \'' + userEmail + '\'')
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

router.post('/api/edit', function (req, res) {
  let name = req.body.editName
  let surname = req.body.editSurname
  let email = req.body.email
  let cellphone = req.body.cellphone

  let oldEmail = session.getUser()

  db.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM users')
    })
    .then(result => {
      if (profileManager.emailAlreadExists(email, oldEmail, result.recordset)) {
        res.send('Email already exitst!')
      } else {
        let query = 'UPDATE users SET username = \'' + name + '\', surname = \'' + surname + '\', email = \'' + email + '\', cellphone = \'' + cellphone + '\' WHERE email = \'' + oldEmail + '\''

        db.pools
          .then((pool) => {
            return pool.request()
              .query(query)
          })

        if (!profileManager.emailChanged(oldEmail, email)) {
          res.redirect('/profile')
        } else {
          res.redirect('/')
        }
      }
    })
})

router.post('/api/delete', function (req, res) {
  let email = session.getUser()
  db.pools.then((pool) => {
    return pool.request().query('DELETE FROM users WHERE email = \'' + email + '\'')
  })

  res.redirect('/')
})

module.exports = router
