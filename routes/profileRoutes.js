'use strict'
let path = require('path')
let express = require('express')
let userProf = require('../public/scripts/profile/userProfile.js')
let router = express.Router()

router.get('/create', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'create.html'))
})

router.get('/edit', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', 'profile', 'edit.html'))
})

//RESTful interface
router.get('/api/list', function (req, res) {
    res.json(userProf.getProfileAttributes())
})

router.get('/api/get/:id', function (req, res) {
    res.json(userProf.get(req.params.id))
})

router.post('/api/create', function (req, res) {
    let profile = { uname: req.body.uname, psw: req.body.psw, emailaddress: req.body.emailaddress, phone: req.body.phone }
    console.log('creating a profile', profile)
    userProf.add(profile)
    res.redirect(req.baseUrl + '/api/list')
})

router.post('/api/edit', function (req, res) {
    let attribute = req.body.editStudent.split(',')[0]
    let index = req.body.editStudent.split(',')[1]
    if (index <= userProf.size()) {
        console.log('Editing a student entry : ', userProf.get(index))
        userProf.edit(attribute, index)
        res.redirect(req.baseUrl + '/api/list')
    } else {
        console.log('Out of Bounds')
        res.redirect(req.baseUrl + '/api/list')
    }
})

module.exports = router