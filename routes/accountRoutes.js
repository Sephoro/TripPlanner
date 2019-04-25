'use strict'

let path = require('path')
let express = require('express')
let Registeredusers = require('../models/registeredusers')

let router = express.Router()

router.get('/create', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'account', 'creatingaccount.html'))
})

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

module.exports = router
