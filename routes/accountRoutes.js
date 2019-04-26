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
    for (let index = 0; index < userdata.length; index++) {
      if (email === userdata[index].email && password === userdata[index].password) {
        res.redirect('/Home')
        break
      } else if (email !== userdata[index].email && password === userdata[index].password) {
        res.redirect('/account/login')
        break
      } else if (email === userdata[index].email && password !== userdata[index].password) {
        res.redirect('/account/login')
        break
      } else if (email !== userdata[index].email && password !== userdata[index].password) {
        res.redirect('/account/login')
        break
      }
    }
  })
}
)

module.exports = router
