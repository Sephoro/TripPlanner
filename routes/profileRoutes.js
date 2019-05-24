'use strict'
let path = require('path')
let express = require('express')
let router = express.Router()
let passwordRes = require('../models/ResetPassword')
let db = require('../data/database')
let session = require('../models/sessions.js')
let profileManager = require('../models/profileManager')

router.get('/edit', function (req, res) {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'edit.html'))
  } else {
    res.redirect('/account/login')
  }
})

router.get('/delete', function (req, res) {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'delete.html'))
  } else {
    res.redirect('/account/login')
  }
})

router.get('/', function (req, res) {
  if (req.session.loggedIn) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'profile.html'))
  } else {
    res.redirect('/account/login')
  }
})

router.get('/PasswordReset', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile', 'PasswordReset.html'))
})

// RESTful interface
router.get('/api/list', function (req, res) {
  db.pools
    .then((pool) => {
      // let userEmail = session.getUser()
      let userEmail = req.session.user
      return pool.request()

        .query("SELECT * FROM users WHERE email = '" + userEmail + "'")
    })
    .then(result => {
      res.send(result.recordset)
    })
    .catch(err => {
      res.send({ Error: err
      })
    })
})

router.post('/api/RS', function (req, res) {
  let oldPassword = req.body.password
  let newPassword = req.body.inputPassword
  let confirmPassword = req.body.confirmPassword
  let oldPass = false
  let newPass = false
  // let email = session.getUser()
  let email = req.session.user

  db.pools
    .then((pool) => {
      return pool.request()
        .query("SELECT * FROM users WHERE email = '" + email + "'")
    })
    .then(result => {
      oldPass = passwordRes.verifyPassword(result.recordset[0], oldPassword)

      if (oldPass === true) {
        newPass = passwordRes.verifyNewPassword(newPassword, confirmPassword)

        if (newPass === true) {
          db.pools
            .then((pool) => {
              return pool.request()
                .query("UPDATE users SET password = '" + newPassword + "' WHERE email = '" + email + "'")
            })
          req.session.loggedIn = false
          res.redirect('/')
        } else {
          console.log('New password does not match')
        }
      } else {
        console.log('Password didnt match')
      }
    })
    .catch(err => {
      res.send({ Error: err
      })
    })
})

router.post('/api/edit', function (req, res) {
  let name = req.body.editName
  let surname = req.body.editSurname
  let email = req.body.email
  let cellphone = req.body.cellphone

  // let oldEmail = session.getUser()
  let oldEmail = req.session.user

  db.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM users')
    })
    .then(result => {
      if (profileManager.emailAlreadExists(email, oldEmail, result.recordset)) {
        res.send('Email already exitst!')
      } else {
        let query = "UPDATE users SET username = '" + name + "', surname = '" + surname + "', email = '" + email + "', cellphone = '" + cellphone + "' WHERE email = '" + oldEmail + "'"

        db.pools
          .then((pool) => {
            return pool.request()
              .query(query)
          })

        if (!profileManager.emailChanged(oldEmail, email)) {
          res.redirect('/profile')
        } else {
          // session.loggedOut()
          req.session.loggedIn = false
          res.redirect('/')
        }
      }
    })
})

router.post('/api/delete', function (req, res) {
  // let email = session.getUser()
  let email = req.session.user
  let user = req.body._deleteUser

  if (user === true) {
    db.pools.then((pool) => {
      return pool.request().query("DELETE FROM users WHERE email = '" + email + "'")
    })
    // session.loggedOut()
    req.session.loggedIn = false
    res.redirect('/')
  } else {
    res.redirect('/profile')
  }
})
module.exports = router
