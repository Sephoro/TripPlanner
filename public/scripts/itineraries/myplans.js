'use strict'

fetch('/plan/api/myplans')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load itineraries!'
    }
  })
  .then(function (plans) {
    let counter = 1
    let plan = 1

    // creating the button
    let shareButton = document.createElement('a')
    shareButton.className = 'btn btn-info btn-lg'
    shareButton.id = 'shareButton'
    shareButton.href = '#'

    let sp = document.createElement('span')
    sp.className = 'glyphicon glyphicon-share'

    let txt = document.createTextNode('Share')
    shareButton.appendChild(sp)
    shareButton.appendChild(txt)

    let header = document.createElement('h4')
    header.innerHTML = 'PLAN : ' + String(plan)
    let itContainer = document.createElement('div')
    itContainer.id = 'itDeck'
    let cardDeck = document.createElement('div')
    cardDeck.className = 'card-deck'
    itContainer.appendChild(header)
    itContainer.appendChild(shareButton)
    itContainer.appendChild(cardDeck)
    document.body.appendChild(itContainer)

    let itID = plans[0].itinerary_id
    plans.forEach(data => {
      if (itID !== data.itinerary_id) {
        // Increase the number of plans
        plan++
        //
        itContainer = document.createElement('div')

        // Make a new header
        header = document.createElement('h4')
        header.innerHTML = 'PLAN : ' + String(plan)
        itContainer.appendChild(header)

        // create a new button
        shareButton = document.createElement('a')
        shareButton.className = 'btn btn-info btn-lg'
        shareButton.id = 'shareButton'
        shareButton.href = '#'

        sp = document.createElement('span')
        sp.className = 'glyphicon glyphicon-share'

        txt = document.createTextNode('Share')
        shareButton.appendChild(sp)
        shareButton.appendChild(txt)

        itContainer.appendChild(shareButton)

        // Create a new itinerary deck
        cardDeck = document.createElement('div')
        cardDeck.className = 'card-deck'
        itContainer.appendChild(cardDeck)

        // Append new container to the body
        document.body.appendChild(itContainer)
        // Update itinerary ID
        itID = data.itinerary_id
        counter = 1
      }
      // Get the location, date and duration
      let location = document.createElement('h3')
      location.className = 'card-title'
      location.innerHTML = '&#128205 ' + String(counter) + ' ' + data.location

      let date = document.createElement('p')
      date.className = 'card-text'
      date.innerHTML = 'From: ' + data.startDate + ' to ' + data.endDate

      let duration = document.createElement('p')
      duration.className = 'card-text'
      duration.innerHTML = data.duration + ' days'

      let activities = document.createElement('p')
      activities.className = 'card-text'
      activities.innerHTML = data.activities
      if (counter % 4 === 0 && counter !== 0) {
        cardDeck = document.createElement('div')
        cardDeck.className = 'card-deck'
        document.body.appendChild(cardDeck)
      }
      let card = document.createElement('div')
      card.className = 'card'

      let img = document.createElement('img')
      img.src = '/cdn/images/roadtrip.jpg'
      img.alt = 'Card image cap'
      img.className = 'card-img-top'

      let cardBody = document.createElement('div')
      cardBody.className = 'card-body'

      // Append into cardbody
      cardBody.appendChild(location)
      cardBody.appendChild(date)
      cardBody.appendChild(duration)
      cardBody.appendChild(activities)

      // Append into card
      card.appendChild(img)
      card.appendChild(cardBody)

      // Append into cardDEck
      cardDeck.appendChild(card)
      counter++
    })
  })
