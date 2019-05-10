'use strict'

// Alert user if the passwors match or not
let checkPasswordMatch = function () {
  let confirmPassword = document.getElementById('inputPassword').value
  let password = document.getElementById('confirmPassword').value

  if (confirmPassword === password) {
    document.getElementById('message').style.color = 'green'
    document.getElementById('message').innerHTML = 'matching'
  } else {
    document.getElementById('message').style.color = 'red'
    document.getElementById('message').innerHTML = 'not matching'
  }
}

let checkPasswordLength = function () {
  let password = document.getElementById('inputPassword').value

  if (password.length < 8) {
    document.getElementById('message1').style.color = 'red'
    document.getElementById('message1').innerHTML = 'weak password, use a minimum of 8 characers'
  } else {
    document.getElementById('message1').style.color = 'green'
    document.getElementById('message1').innerHTML = 'strong password'
  }
}

let checkCellnumber = function () {
  let cellnumber = document.getElementById('inputcellphone').value

  if (cellnumber.length < 10 || cellnumber.length > 10) {
    document.getElementById('message2').style.color = 'red'
    document.getElementById('message2').innerHTML = 'Invalid number'
  } else {
    document.getElementById('message2').style.color = 'green'
    document.getElementById('message2').innerHTML = ''
  }
}

let signUp = document.getElementById('signUpButton')

// User cannot proceed if passwords do not match
signUp.addEventListener('click', function () {
  let confirmPassword = document.getElementById('inputPassword').value
  let password = document.getElementById('confirmPassword').value

  if (confirmPassword !== password) {
    window.alert('Passwords do not match!!')
  }
})
