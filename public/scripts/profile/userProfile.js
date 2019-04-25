'use strict'


let profileAttributes = ["kabelo", "masalane", "kabelo@gmail.com", "0792253550"]

module.exports = {

    add: function (e) {
        profileAttributes.push(e)
    },

    get: function (e) {
        return profileAttributes[e]
    },

    edit: function (newProfile, e) {
        profileAttributes[e] = newProfile
        return profileAttributes
    },

    delete: function (e) {
        profileAttributes.splice(e, 1)
    },

    size: function () {
        return profileAttributes.length
    },

    getProfileAttributes: function () {
        return profileAttributes
    }
}