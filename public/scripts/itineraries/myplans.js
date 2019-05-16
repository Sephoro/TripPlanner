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
    let header = document.createElement('h4')
    header.innerHTML = 'PLAN : ' + String(plan)
    document.body.appendChild(header)
    let cardDeck = document.createElement('div')
    cardDeck.className = 'card-deck'
    document.body.appendChild(cardDeck)

    let itID = plans[0].itinerary_id
    plans.forEach(data => {
      if (itID !== plans.itinerary_id) {
        plan++
        header = document.createElement('h4')
        header.innerHTML = 'PLAN : ' + String(plan)
        document.body.appendChild(header)
        itID = plans.itinerary_id
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

      let a = document.createElement('a')
      a.href = '/plan/delplan'

      let del = document.createElement('button')
      del.className = 'del--'
      del.id = 'del'
    
      let delTxt = document.createTextNode('Delete')
      a.appendChild(delTxt)
      del.appendChild(a)

      let cardBody = document.createElement('div')
      cardBody.className = 'card-body'

      // Append into cardbody
      cardBody.appendChild(location)
      cardBody.appendChild(date)
      cardBody.appendChild(duration)
      cardBody.appendChild(activities)
      cardBody.appendChild(del)

      // Append into card
      card.appendChild(img)
      card.appendChild(cardBody)

      // Append into cardDEck
      cardDeck.appendChild(card)
      counter++
    })
  })
