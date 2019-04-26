'use strict'

let path = require('path')
let express = require('express')
let Registeredusers = require('../models/registeredusers')

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
  const registeredusers = new Registeredusers(name, surname, email, cellphone, password, confirmpassword)
  registeredusers.savenewuser()
  res.redirect('/Home')
})

// Reading user credentials and checking if they exist on the Database
// if exists, lead to home page, else reload the login page and try again
router.post('/api/login', function (req, res) {
  const email = req.body.email
  const password = req.body.password
  Registeredusers.fetchAllusers(userdata => {
    let index = userdata.findIndex(function (user) {
      return user.email === email
    })
    let index2 = userdata.findIndex(function (user) {
      return user.password === password
    })
    let negativeindex = -1
    if (index !== negativeindex || index2 !== negativeindex) {
      if (index === index2) {
        res.redirect('/Home')
      } else if (index !== index2) {
        res.redirect('/account/login')
      }
    } else {
      res.redirect('/account/login')
    }
  })
}
)

module.exports = router
