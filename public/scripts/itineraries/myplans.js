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

      let a1 = document.createElement('a')
      let a2 = document.createElement('a')

      let del = document.createElement('button')
      let edit = document.createElement('button')

      a1.href = '/plan/myplans'
      a2.href = '/plan/editplan'

      del.className = 'del--'
      edit.className = 'edit--'

      del.id = data.plan_id
      edit.id = data.plan_id

      let delTxt = document.createTextNode('Delete')
      let editTxt = document.createTextNode('Edit')

      a1.appendChild(delTxt)
      a2.appendChild(editTxt)

      del.appendChild(a1)
      edit.appendChild(a2)

      let cardBody = document.createElement('div')
      cardBody.className = 'card-body'

      // Append into cardbody
      cardBody.appendChild(location)
      cardBody.appendChild(date)
      cardBody.appendChild(duration)
      cardBody.appendChild(activities)
      cardBody.appendChild(del)
      cardBody.appendChild(edit)

      // Append into card
      card.appendChild(img)
      card.appendChild(cardBody)

      // Append into cardDEck
      cardDeck.appendChild(card)
      counter++
    })

    let button1 = document.getElementsByClassName('edit--')

    for (let i = 0; i < button1.length; i++) {
      button1[i].addEventListener('click', function () {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', './api/editPlanForm', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({
          value: button1[i].id,
        }))
      }, false)
    }

    let button2 = document.getElementsByClassName('del--')

    for (let i = 0; i < button2.length; i++) {
      button2[i].addEventListener('click', function () {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', './api/delplan', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({
          value: button2[i].id
        }))
      }, false)
    }
  })