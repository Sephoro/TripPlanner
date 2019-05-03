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

      .query('SELECT * FROM users WHERE email = \'bv.radiokana@gmail.com\'')
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
  // let entry = { name: req.body.editName,
  //   surname: req.body.editSurname,
  //   email: req.body.email,
  //   cellphone: req.body.cellphone,
  //   password: req.body.passWord,
  //   confirmPassword: req.body.passWord
  
  // }

  db.pools
    .then((pool) => {
      return pool.request()
        .query('UPDATE users SET username = \'' + req.body.editName + '\', surname = \'' + req.body.editSurname + '\', email = \'' + req.body.email + '\'WHERE email = \'Elias@gmail.com\'')
    })

  res.redirect('/Home')
})

router.post('/api/delete', function (req, res) {

  db.pools.then((pool) => {

    return pool.request().query('DELETE FROM users WHERE email = \'1408187@students.wits.ac.za\'')
  })

  res.redirect('/')
})

module.exports = router