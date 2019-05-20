'use strict'


// RETURNS A PROMISE FOR THE GET REQUEST
fetch('/plan/api/myplans_')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load itineraries!'
    }
  })
  .then(function (data) { // DISPLAY THE PLAN DATABASE 

    // RETRIEVE THE USER INFORMATION BY ELEMENT
    let newLoc = document.getElementById('location')
    newLoc.value = data[0].location

    let newLab = document.getElementById('activities')
    newLab.value = data[0].activities

    let newStartDat = document.getElementById('startDate')
    newStartDat.value = data[0].startDate

    let newEndDat = document.getElementById('endDate')
    newEndDat.value = data[0].endDate
  })
  .catch(function (e) {
    alert(e)
  })