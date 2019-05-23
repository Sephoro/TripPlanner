'use strict'

// Returns a Promise for the GET request
fetch('/profile/api/list')
  .then(function (response) {

    // Check if the request returned a valid code
    if (response.ok)
      return response.json() // Return the response parse as JSON if code is valid
    else
      throw 'Failed to load details of the logged in user'
  })
  .then(function (data) { // Display the database information appropriately
    console.log(data[0].username)
    let userName = document.getElementById('login-I')
    let name = document.createTextNode(data[0].username) //+ " " + data[0].surname)

    document.getElementById('login-I').style.color = "yellow";
    document.getElementById('login-I').style.fontFamily = "Arial";
    document.getElementById('login-I').style.fontSize = "larger";

    userName.appendChild(name)
    
  })
  .catch(function (e) {
    alert(e)
  })
