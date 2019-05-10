'using strict'

let verifySignUpEmail = function (users, email) {
  let index = -1
  let emailexist = false
  let index1 = users.findIndex(function (user) {
    return user.email === email
  })

  if (index === index1) {
    emailexist = true
  }
  return emailexist
}

let verifyLengthPassword = function (password) {
  if (password.length >= 8) {
    return true
  } else {
    return false
  }
}

let verifyCellphone = function (cellphone) {
  if (cellphone.length < 10 || cellphone.length > 10) {
    return false
  } else {
    return true
  }
}

module.exports = {
  verifySignUpEmail: verifySignUpEmail,
  verifyLengthPassword: verifyLengthPassword,
  verifyCellphone: verifyCellphone
}
