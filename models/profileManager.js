'use strict'

// Checks if the user changed their email
let emailChanged = function (oldemail, newEmail) {
  return oldemail !== newEmail
}

// Checks if the email already exist on the database
let emailAlreadExists = function (newEmail, oldEmail, users) {
  // Is it the same email?
  if (oldEmail === newEmail) return false
  else {
    let index = users.findIndex(function (user) {
      return user.email === newEmail
    })
    return index >= 0
  }
}

module.exports = {
  emailChanged: emailChanged,
  emailAlreadExists: emailAlreadExists
}
