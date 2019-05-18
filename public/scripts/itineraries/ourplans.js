'use strict'
fetch('/plan/api/ourplans')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load itineraries!'
    }
  })
  .then(function (allPlans) {
    // Create accordion

    let accordion = document.createElement('div')
    accordion.id = 'accordion'
    document.body.appendChild(accordion)

    let plan = 1

    // Go through each itineray for plans
    allPlans.forEach(plans => {
      let counter = 1
      // Create collapsible

      let icard = document.createElement('div')
      icard.className = 'icard card'
      accordion.appendChild(icard)

      // Create class header

      let icardHeader = document.createElement('div')
      icardHeader.className = 'card-header'
      icardHeader.id = 'heading' + String(plan)
      icard.appendChild(icardHeader)

      // create header for button

      let h5 = document.createElement('h5')
      h5.className = 'mb-0'
      icardHeader.appendChild(h5)

      // create the actual button

      let ibutton = document.createElement('button')
      ibutton.className = 'btn btn-link'
      ibutton.setAttribute('data-toggle', 'collapse')
      let dataTarget = '#collapse' + String(plan)
      ibutton.setAttribute('data-target', dataTarget)
      ibutton.setAttribute('aria-expanded', 'true')
      let ariaControls = 'collapse' + String(plan)
      ibutton.setAttribute('aria-controls', ariaControls)
      ibutton.innerText = 'Group Plan ' + String(plan)
      h5.appendChild(ibutton)

      // Create a collapse

      let collapse = document.createElement('div')
      collapse.id = 'collapse' + String(plan)
      collapse.className = 'collapse'
      let ariaLabel = 'heading' + String(plan)
      collapse.setAttribute('aria-labelledby', ariaLabel)
      collapse.setAttribute('data-parent', '#accordion')
      icard.appendChild(collapse)

      // Create card body

      let icardBody = document.createElement('div')
      icardBody.className = 'card-body'
      collapse.appendChild(icardBody)

      // Create inner plans card container

      let itContainer = document.createElement('div')
      itContainer.id = 'itDeck'
      icardBody.appendChild(itContainer)

      // Create a card deck

      let cardDeck = document.createElement('div')
      cardDeck.className = 'card-deck'
      itContainer.appendChild(cardDeck)

      // Increase the count of plans

      plan++

      // Fill cards for each plan
      plans.forEach(data => {
        //
        // Create card element

        let card = document.createElement('div')
        card.className = 'pcard card'

        // Create card body element

        let cardBody = document.createElement('div')
        cardBody.className = 'card-body'

        // Create location elemnt

        let location = document.createElement('h3')
        location.className = 'card-title'
        location.innerHTML = '&#128205 ' + String(counter) + ' ' + data.location

        // Create date element

        let date = document.createElement('p')
        date.className = 'card-text'
        date.innerHTML = 'From: ' + data.startDate + ' to ' + data.endDate

        // Create duration

        let duration = document.createElement('p')
        duration.className = 'card-text'
        duration.innerHTML = data.duration + ' days'

        // Create ativities element

        let activities = document.createElement('p')
        activities.className = 'card-text'
        activities.innerHTML = data.activities

        // Ensure they are always of size four

        if (counter % 4 === 0 && counter !== 0) {
          cardDeck = document.createElement('div')
          cardDeck.className = 'card-deck'
          icardBody.appendChild(cardDeck)
        }

        // Create img element

        let img = document.createElement('img')
        img.src = '/cdn/images/roadtrip.jpg'
        img.alt = 'Card image cap'
        img.className = 'card-img-top'

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
    }

    )
  })
