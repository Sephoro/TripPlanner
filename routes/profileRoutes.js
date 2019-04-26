'use strict'
let path = require('path')
let express = require('express')
let userProf = require('../public/scripts/profile/manageProfile.js')
let router = express.Router()

router.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile', 'edit.html'))
})

router.get('/delete', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile', 'delete.html'))
})

// RESTful interface
router.get('/api/list', function (req, res) {
  res.json(userProf.getProfileAttributes())
})

router.post('/api/edit', function (req, res) {
  let entry = { name: req.body.editName,
    surname: req.body.editSurname,
    email: req.body.email,
    cellphone: req.body.cellphone,
    password: req.body.passWord,
    confirmPassword: req.body.passWord
  }

  userProf.edit(entry, req.body.email)
  res.redirect('/Home')
})

router.post('/api/delete', function (req, res) {
  userProf.delete(req.body.email)
  res.redirect('/')
})
module.exports = router
