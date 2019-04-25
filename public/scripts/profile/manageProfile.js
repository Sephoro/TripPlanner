'use strict'
const fs = require('fs');

let profileAttributes = require('../../../userdata.json')

module.exports = {

    get: function (email) {

        const entry = profileAttributes.filter(profile => profile.email === email)
        return entry
    },

    edit: function (newProfile, primaryKey) {

        let index = profileAttributes.findIndex(function(profile){
            return profile.email === primaryKey
        })

        profileAttributes[index] = newProfile
        fs.writeFileSync('../../../userdata.json', JSON.stringify(profileAttributes))
    },

    delete: function (primaryKey) {

        let iter = profileAttributes.findIndex(function(profile){
            return profile.email === primaryKey
        })
        profileAttributes.splice(iter,1) 
        fs.writeFileSync('../../../userdata.json', JSON.stringify(profileAttributes))
    },

    size: function () {
        return profileAttributes.length
    },

    getProfileAttributes: function () {
        return profileAttributes
    }
}

  