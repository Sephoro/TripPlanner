'use strict'

let verifyPassword = function (users, password) {
  if (users.password === password) {
    return true
  }else {
    return false
  }
}

let verifyNewPassword = function (newPass, confirmPass) {
  if (newPass == confirmPass) {
    return true
  }else {
    return false
  }
}

module.exports = {
    verifyPassword: verifyPassword,
    verifyNewPassword: verifyNewPassword
}
