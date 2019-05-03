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

let signUp = document.getElementById('signUpButton')

// User cannot proceed if passwords do not match
signUp.addEventListener('click', function () {
  let confirmPassword = document.getElementById('inputPassword').value
  let password = document.getElementById('confirmPassword').value

  if (confirmPassword !== password) {
    window.alert('Passwords do not match!!')
  }
})
