'use strict'

fetch(' ')
  .then(function () {
    // Guard for first time addition of a place
    let firstTime = true
    let addLocationButton = document.getElementById('addLocation')

    addLocationButton.addEventListener('click', function () {
      if (firstTime) {
        let h1 = document.createElement('h1')
        let locations = document.getElementById('locations')
        h1.innerHTML = '&#x1F4CC; My Itinenary'
        h1.className += 'h1'
        locations.appendChild(h1)
        firstTime = false
      }

      // Calculating duration of stay at location
      let start = document.getElementById('startDate').value
      let end = document.getElementById('endDate').value
      let duration = Math.abs(new Date(end) - new Date(start)) / (3600 * 1000 * 24)

      // Location date and duration
      let paragraph = document.createElement('p')
      paragraph.className = 'places'
      let locations = document.getElementById('locations')
      let location = document.getElementById('location').value
      paragraph.innerHTML = '&#128205 ' + location + ' from ' + start + ' to ' + end + ' : ' + duration + ' days'
      locations.appendChild(paragraph)

      // Activities
      let ul = document.createElement('ul')
      let li = document.createElement('li')
      let a = document.createElement('a')
      // a.href += '#'
      let p2 = document.createElement('p')
      let p = document.createElement('p')
      let activities = document.getElementById('activities').value
      p2.innerHTML = 'Activities'
      p.innerHTML = activities
      p.id += 'activity'
      p2.id += 'noteheader'

      a.appendChild(p2)
      a.appendChild(p)
      li.appendChild(a)
      ul.appendChild(li)
      locations.appendChild(ul)
    })
  })
