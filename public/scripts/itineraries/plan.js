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

fetch('/plan/api/myplan')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load itineraries!'
    }
  })
  .then(function (plans) {
    if (firstTime) {
      let h1 = document.createElement('h1')
      let locations = document.getElementById('locations')
      h1.innerHTML = '&#x1F4CC; My Itinenary'
      h1.className += 'h1'
      locations.appendChild(h1)
      firstTime = false
    }
    plans.forEach(data => {
      // Get the location, date and duration
      let paragraph = document.createElement('p')
      paragraph.className = 'places'
      let locations = document.getElementById('locations')
      // let location = document.getElementById('location').value
      paragraph.innerHTML = '&#128205 ' + data.location + ' from ' + data.startDate + ' to ' + data.endDate + ' : ' + data.duration + ' days'
      locations.appendChild(paragraph)

      // Get the Activities
      let ul = document.createElement('ul')
      let li = document.createElement('li')
      let a = document.createElement('a')
      let p2 = document.createElement('p')
      let p = document.createElement('p')
      // let activities = document.getElementById('activities').value
      p2.innerHTML = 'Activities'
      p.innerHTML = data.activities
      p.id += 'activity'
      p2.id += 'noteheader'

      a.appendChild(p2)
      a.appendChild(p)
      li.appendChild(a)
      ul.appendChild(li)
      locations.appendChild(ul)
    })
  })

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
}, false)
