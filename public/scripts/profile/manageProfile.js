'use strict'
const fs = require('fs');

let profileAttributes = require('../../../data/userdata.json')

module.exports = {

    get: function (email) {

        const entry = profileAttributes.filter(profile => profile.email === email)
        return entry
    },

    edit: function (newProfile, e) {

        let index = profileAttributes.findIndex(function(profile){
            return profile.email === e
        })

        profileAttributes[index] = newProfile

        fs.writeFileSync('../../../data/userdata.json', JSON.stringify(profileAttributes))
    },

    size: function () {
        return profileAttributes.length
    },

    getProfileAttributes: function () {
        return profileAttributes
    }
}

  