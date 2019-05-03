'use strict'

// The following functions verify if the credentials
// entered by the user are valid(found in the data base)

let verifyEmail = function (users, email) {
  let index = users.findIndex(function (user) {
    return user.email === email
  })

  return index
}

let verifyPassword = function (users, password) {
  let index = users.findIndex(function (user) {
    return user.password === password
  })
  return index
}

let isValidCredentials = function (index, index2) {
  let isValid = false
  if (index >= 0 || index2 >= 0) {
    if (index === index2) {
      isValid = true
    }
  }
  return isValid
}

let ValidateConfirmPassword = function (password, confirmPassword) {
  if (confirmPassword === password) {
    return true
  } else {
    return false
  }
}

module.exports = {
  verifyEmail: verifyEmail,
  verifyPassword: verifyPassword,
  isValidCredentials: isValidCredentials,
  ValidateConfirmPassword: ValidateConfirmPassword

}
