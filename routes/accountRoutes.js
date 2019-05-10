'use strict'

let path = require('path')
let express = require('express')
let Registeredusers = require('../models/registeredusers')
let db = require('../data/database')
let loginVer = require('../models/loginVerification')
let counter = 0

let router = express.Router()

router.get('/create', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'creatingaccount.html'))
})

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'login.html'))
})

// Reading user credentials for signing up
router.post('/api/create', function (req, res) {
  const name = req.body.name
  const surname = req.body.surname
  const email = req.body.email
  const cellphone = req.body.cellphone
  const password = req.body.password
  const confirmpassword = req.body.confirmpassword

  let isPasswordsMatch = loginVer.ValidateConfirmPassword(password, confirmpassword)

  // Store details of new user if passwords match
  if (isPasswordsMatch) {
    db.pools
      .then((pool) => {
        return pool.request()
          .query('INSERT INTO users (email, username, surname,cellphone, password) VALUES (\'' + email + '\',\'' + name + '\',\'' + surname + '\',\'' + cellphone + '\',\'' + password + '\')')
      })

    res.redirect('/Home')
  }
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
      let status = loginVer.isRegistered(result.recordset, email)
      console.log(status)

      // Verify if user is registered and found on the database
      if (status === 'NotRegistered') {
        res.send('NOT A REGISTERED USER')
      } else if (status === 'Registered') {
        // Verify Credentials
        let index = loginVer.verifyEmail(result.recordset, email)
        let index2 = loginVer.verifyPassword(result.recordset, password)

        if (loginVer.isValidCredentials(index, index2)) {
        // If credentials are correct, redirect to the loggedIn user homepage
          res.redirect('/Home')
        } else {
        // If credentials are incorrect, redirect to the login page
        // and give user 3 chance to enter their details
          counter = counter + 1
          if (counter !== 3) {
            res.redirect('/account/login')
          } else {
            console.log('PasswordBlocked!!!')
            db.pools
              .then((pool) => {
                return pool.request()
                  .query('UPDATE users SET access_status = 1 WHERE  email = (\'' + email + '\')')
              })
            res.send('Account Blocked!')
          }
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
