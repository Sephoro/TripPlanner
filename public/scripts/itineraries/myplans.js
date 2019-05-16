'use strict'

fetch('/api/database')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load Database!'
    }
  })
  .then(function (users) {
    users = users.recordset

    fetch('/plan/api/myplans')
      .then(function (response) {
        if (response.ok) { return response.json() } else {
          throw 'Failed to load itineraries!'
        }
      })
      .then(function (plans) {
        let counter = 1
        let countSelect = 0
        let plan = 1

        // Dropdown for sharing
        let selectUser = document.createElement('select')
        let opt = document.createElement('option')
        let textN = document.createTextNode('Select User')

        selectUser.id = '0'
        opt.value = '0'
        opt.appendChild(textN)
        selectUser.appendChild(opt)

        // Get data base to query selector
        for (let i = 1; i < users.length - 1; i++) {
          opt.value = i
          textN = document.createTextNode(users[i - 1].username)
          opt = document.createElement('option')

          opt.appendChild(textN)
          selectUser.appendChild(opt)
        }

        // creating the button
        let shareButton = document.createElement('button')
        shareButton.className = 'shareBut'
        shareButton.type = 'submit'
        shareButton.href = '#'

        let txt = document.createTextNode('Invite')
        shareButton.appendChild(txt)
        let email = ''
        //
        let header = document.createElement('h4')
        header.innerHTML = 'PLAN : ' + String(plan)
        let itContainer = document.createElement('div')
        itContainer.id = 'itDeck'
        let cardDeck = document.createElement('div')
        cardDeck.className = 'card-deck'
        itContainer.appendChild(header)
        itContainer.appendChild(selectUser)
        itContainer.appendChild(shareButton)
        itContainer.appendChild(cardDeck)
        document.body.appendChild(itContainer)

        let itID = plans[0].itinerary_id
        shareButton.id = String(itID)
        plans.forEach(data => {
          if (itID !== data.itinerary_id) {
            // Increase the number of plans
            plan++
            countSelect++
            //
            itContainer = document.createElement('div')

            // Make a new header
            header = document.createElement('h4')
            header.innerHTML = 'PLAN : ' + String(plan)
            itContainer.appendChild(header)

            selectUser = document.createElement('select')
            opt = document.createElement('option')
            textN = document.createTextNode('Select User')

            selectUser.id = String(countSelect)
            opt.value = '0'
            opt.appendChild(textN)
            selectUser.appendChild(opt)

            // Get data base to query selector
            for (let i = 1; i < users.length - 1; i++) {
              opt.value = i
              textN = document.createTextNode(users[i - 1].username)
              opt = document.createElement('option')

              opt.appendChild(textN)
              selectUser.appendChild(opt)
            }

            // create a new button
            shareButton = document.createElement('button')
            shareButton.className = 'shareBut'
            shareButton.id = String(itID)
            shareButton.href = '#'
            txt = document.createTextNode('Invite')

            shareButton.appendChild(txt)
            itContainer.appendChild(selectUser)
            itContainer.appendChild(shareButton)
            // itContainer.appendChild(input)

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

        // Event listener for all buttons of the itineraries

        let shareBut = document.getElementsByClassName('shareBut')

        for (let i = 0; i < shareBut.length; i++) {
          shareBut[i].addEventListener('click', function () {
            let index = document.getElementById(String(i)).value

            if (index !== 1) {
              email = users[index - 2].email
            }

            var xhr = new XMLHttpRequest()
            xhr.open('POST', './myplans/api/save', true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({
              email_inivte: email,
              itinerarieID: shareBut[i].id

            }))
            alert('Successfully share itinerary with ' + String(users[index - 2].username))
          }, false)
        }
      })
  })
