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
    let UserName = document.getElementById('name')
    let name = document.createTextNode(data[0].username)
    UserName.appendChild(name)

    let UserEmail = document.getElementById('email')
    let email = document.createTextNode(data[0].email)
    UserEmail.appendChild(email)

    let UserSurname = document.getElementById('surname')
    let surname = document.createTextNode(data[0].surname)
    UserSurname.appendChild(surname)

    let UserCellphone = document.getElementById('cellphone')
    let cellphone = document.createTextNode(data[0].cellphone)
    UserCellphone.appendChild(cellphone)

    let HeaderName = document.getElementById('HeaderName')
    let Name = document.createTextNode(data[0].username)
    HeaderName.appendChild(Name)
  })
  .catch(function (e) {
    alert(e)
  })
