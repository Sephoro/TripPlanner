'use strict'

let path = require('path')
let express = require('express')
let db = require('../data/database')
let loginVer = require('../models/loginVerification')
let counter = 0
let session = require('../models/sessions.js')
let signUpVer = require('../models/signUpVerication')
let passport = require('passport')
let auth = require('../models/google')

let router = express.Router()

router.get('/create', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'creatingaccount.html'))
})

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'login.html'))
})

router.get('/blocked', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'accountBlocked.html'))
})

router.get('/notregistered', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'notRegisteredUser.html'))
})

auth(passport)
router.use(passport.initialize())

// Reading user credentials for signing up
router.post('/api/create', function (req, res) {
  const name = req.body.name
  const surname = req.body.surname
  const email = req.body.email
  const cellphone = req.body.cellphone
  const password = req.body.password
  const confirmpassword = req.body.confirmpassword

  db.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM users')
    })
    .then(result => {
      let confirmemail = signUpVer.verifySignUpEmail(result.recordset, email)

      if (confirmemail) {
        let isPasswordsMatch = loginVer.ValidateConfirmPassword(password, confirmpassword)
        let passWordLength = signUpVer.verifyLengthPassword(password)
        let validCellphone = signUpVer.verifyCellphone(cellphone)

        // Store details of new user if passwords match
        if (isPasswordsMatch && passWordLength && validCellphone) {
          db.pools
            .then((pool) => {
              return pool.request()
                .query('INSERT INTO users (email, username, surname,cellphone, password) VALUES (\'' + email + '\',\'' + name + '\',\'' + surname + '\',\'' + cellphone + '\',\'' + password + '\')')
            })
    res.redirect('/')
        } else {
          res.redirect('/account/create')
        }
      } else {
        res.redirect('/account/create')
      }
    })
    .catch(err => {
      console.log(err)
    })
})

// Reading user credentials and checking if they exist on the Database
// if exists, lead to home page, else reload the login page and try again
router.post('/api/login', function (req, res) {
  const email = req.body.email
  const password = req.body.password

  // Read data from the database
  db.pools
    .then((pool) => {
      return pool.request()
        .query('SELECT * FROM users')
    })
    .then(result => {
      let isRegist = loginVer.isRegistered(result.recordset, email)

      // Verify if user is registered and found on the database
      if (isRegist === false) {
        // res.send('NOT A REGISTERED USER')
        res.redirect('/account/notregistered')
      } else if (isRegist === true) {
        // Check if user is blocked or not
        let isBlocked = loginVer.isBlocked(result.recordset, email)
        if (isBlocked === true) {
          res.redirect('/account/blocked')
          // res.send('DUE TO SECURITY REASONS YOUR ACCOUNT HAS BEEN BLOCKED!')
        } else {
          // Verify Credentials
          let index = loginVer.verifyEmail(result.recordset, email)
          let index2 = loginVer.verifyPassword(result.recordset, password)

          if (loginVer.isValidCredentials(index, index2)) {
            // If credentials are correct, redirect to the loggedIn user homepage
        session.setUser(email)
        res.redirect('/')
          } else {
            // If credentials are incorrect, redirect to the login page
            // and give user 3 chance to enter their details
            counter = counter + 1
            if (counter !== 3) {
              res.redirect('/account/login')
            } else {
              // Block the user if they have entered incorrect details 3 consecutive times
              db.pools
                .then((pool) => {
                  return pool.request()
                    .query('UPDATE users SET access_status = 1 WHERE  email = (\'' + email + '\')')
                })
              // res.send('DUE TO SECURITY REASONS YOUR ACCOUNT HAS BEEN BLOCKED!')
              res.redirect('/account/blocked')
            }
          }
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/auth/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']
}))

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  })
)

module.exports = router
