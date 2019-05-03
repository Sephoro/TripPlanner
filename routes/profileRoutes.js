'use strict'
let path = require('path')
let express = require('express')
let router = express.Router()
let db = require('../data/database')

router.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile', 'edit.html'))
})

router.get('/delete', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile', 'delete.html'))
})

router.get('/profilee', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile', 'profilee.html'))
})

// RESTful interface
router.get('/api/list', function (req, res) {
  db.pools
    .then((pool) => {
      return pool.request()

        .query("SELECT * FROM users WHERE email = 'Harold.mokoo@gmail.com'")
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
  let password = req.body.passWord
  let confirmPassword = req.body.passWord

  let query = 'UPDATE users SET username = \'' + name + '\', surname = \'' + surname + '\', email = \'' + email + '\', cellphone = \'' + cellphone + '\' WHERE email = \'Harold.mokoo@gmail.com\''

  db.pools
    .then((pool) => {
      return pool.request()
        .query(query)
    })

  res.redirect('/profile/profilee')
})

router.post('/api/delete', function (req, res) {
  db.pools.then((pool) => {
    return pool.request().query('DELETE FROM users WHERE email = \'' + req.body.email + '\'')
  })

  res.redirect('/')
})

module.exports = router
