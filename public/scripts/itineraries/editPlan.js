'use strict'


// Returns a Promise for the GET request
fetch('/plan/api/myplans_')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load itineraries!'
    }
  })
  .then(function (data) { // Display the database information appropriately

    // Retrieve the user information by element
    let newLoc = document.getElementById('location-I')
    newLoc.value = data[0].location

    let newLab = document.getElementById('activities-I')
    newLab.value = data[0].activities

    let newStartDat = document.getElementById('startDate-I')
    newStartDat.value = data[0].startDate

    let newEndDat = document.getElementById('endDate-I')
    newEndDat.value = data[0].endDate
  })
  .catch(function (e) {
    alert(e)
  })