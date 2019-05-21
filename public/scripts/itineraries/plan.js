'use strict'
// calculate the duration
let durationCalculator = function (date1, date2) {
  let days = (new Date(date1) - new Date(date2)) / (3600 * 1000 * 24)

  if (days === 1) {
    return { string: ' day', days: days }
  }
  return { string: ' days', days: days }
}
// Validate date
let validDate = function (duration) {
  if (duration < 0) {
    return false
  } else {
    return true
  }
}

let validActivities = function (activities) {
  if (activities.split(',').length > 5) {
    return false
  } else {
    return true
  }
}
let firstTime = true

let locations = document.getElementById('locations')
firstTime = false

document.querySelector('#endDate').addEventListener('input', function () {
  let start = document.getElementById('startDate').value
  let end = document.getElementById('endDate').value
  let invalidDate = document.getElementById('endDateLabel')

  let duration = durationCalculator(end, start).days

  if (!validDate(duration)) {
    invalidDate.style.color = 'red'
    invalidDate.innerHTML = '&#10060 End Date:'
  } else {
    invalidDate.style.color = '#49fb35'
    invalidDate.innerHTML = '&#9989 End Date:'
  }
})

document.querySelector('#activities').addEventListener('input', function () {
  let activities = document.getElementById('activities').value
  let activitiesLabel = document.getElementById('actLabel')

  if (!validActivities(activities)) {
    activitiesLabel.innerHTML = '&#10060 Max number of activities exceeded!'
    activitiesLabel.color = 'red'
  } else {
    activitiesLabel.innerHTML = ' &#9989 Activities (Seperated by a comma):'
    activitiesLabel.color = 'green'
  }
})

// Guard for first time addition of a place
// let firstTime = true
let addLocationButton = document.getElementById('addLocation')
// Listen for click of the addLocation button
var labels1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
var labelIndex1 = 0
addLocationButton.addEventListener('click', function () {
  // Getting activities
  let activities = document.getElementById('activities').value

  // Calculating duration of stay at location
  let start = document.getElementById('startDate').value
  let end = document.getElementById('endDate').value
  let duration = durationCalculator(end, start)

  // Dont allow to continue if form contains invalid fields
  if (!validDate(duration.days) || !validActivities(activities)) {
    alert('Correct the above fields')
  }

  let location = document.getElementById('location')
  // let activities = document.getElementById('activities')
  let startDate = document.getElementById('startDate')
  let endDate = document.getElementById('endDate')
  // let duration = durationCalculator(endDate.value, startDate.value).days
  // Get the location, date and duration
  let paragraph = document.createElement('h5')
  let paragraph2 = document.createElement('small')
  paragraph2.innerHTML = labels1[labelIndex1++ % labels1.length] + '. ' + location.value
  paragraph.appendChild(paragraph2)
  let paragraph3 = document.createElement('h6')
  let paragraph4 = document.createElement('small')
  paragraph4.innerHTML = 'Start Date: ' + startDate.value + '   ' + 'End Date: ' + endDate.value
  paragraph3.appendChild(paragraph4)
  let paragraph7 = document.createElement('h6')
  let paragraph8 = document.createElement('small')
  paragraph8.innerHTML = 'Duration: ' + duration.days + ' days'
  paragraph7.appendChild(paragraph8)
  let paragraph5 = document.createElement('h6')
  let paragraph6 = document.createElement('small')
  paragraph6.innerHTML = 'Activities: ' + activities
  let bre = document.createElement('br')
  paragraph5.appendChild(paragraph6)
  let locations2 = document.getElementById('heading2')

  let card = document.createElement('div')
  card.className = 'card bg-light text-dark'

  let cardbody = document.createElement('div')
  cardbody.className = 'card-body'

  cardbody.appendChild(paragraph)
  cardbody.appendChild(paragraph3)
  cardbody.appendChild(paragraph7)
  cardbody.appendChild(paragraph5)
  card.appendChild(cardbody)
  locations2.appendChild(card)
  locations2.appendChild(bre)

  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'plan/api/plan', true)
  xhr.setRequestHeader('Content-Type', 'Application/json')
  xhr.send(JSON.stringify({
    activities: activities,
    location: location.value,
    startDate: startDate.value,
    endDate: endDate.value

  }))

  let form = document.getElementById('form')
  form.reset()
}, false)
