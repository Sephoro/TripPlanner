'use strict'

// Returns a Promise for the GET request
fetch('/profile/api/list')
  .then(function (response) {

    // Check if the request returned a valid code
    if (response.ok)
      return response.json() // Return the response parse as JSON if code is valid
    else
      throw 'Failed to load userInformation: response code invalid!'
  })
  .then(function (data) { // Display the database information appropriately

    // Retrieve the user information by element
    let UserName = document.getElementById('edit-Name')
    UserName.value = data[0].username

    let UserEmail = document.getElementById('email-I')
    UserEmail.value = data[0].email

    let UserSurname = document.getElementById('edit-Surname')
    UserSurname.value = data[0].surname

    let UserCellphone = document.getElementById('cellphone-I')
    UserCellphone.value = data[0].cellphone
  })
  .catch(function (e) {
    alert(e)
  })
