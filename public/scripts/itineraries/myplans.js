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
        // Dropdown for sharing
        let selectUser = document.createElement('select')
        let opt = document.createElement('option')
        let textN = document.createTextNode('Select User')
        selectUser.className = 'i btn btn-outline-dark'

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
        shareButton.className = 'btn btn-outline-warning'
        shareButton.type = 'submit'
        shareButton.href = '#'

        let txt = document.createTextNode('Invite User')
        shareButton.appendChild(txt)
        let email = ''

        let itContainer = document.createElement('div')
        itContainer.id = 'itDeck'

        // Create a card deck
        let cardDeck = document.createElement('div')
        cardDeck.className = 'card-deck'

        // itContainer.appendChild(emailShare)

        let inlineform = document.createElement('form')
        inlineform.className = 'form-inline'
        inlineform.method = 'POST'
        inlineform.action = '/plan/api/myplans/sendemail'

        let formgroup = document.createElement('div')
        formgroup.className = 'form-group mx-sm-3 mb-2'
        inlineform.appendChild(formgroup)

        let itnum = document.createElement('input')
        itnum.className = 'form-control'
        itnum.id = 'itnum'
        itnum.name = 'itnum'
        formgroup.appendChild(itnum)
        itnum.style.visibility = 'hidden'

        let input = document.createElement('input')
        input.type = 'email'
        input.className = 'form-control'
        input.id = 'friendemail'
        input.name = 'friendemail'
        input.placeholder = 'Friend\'s email address'
        formgroup.appendChild(input)

        // Create the share via email button'
        let emailShare = document.createElement('button')
        emailShare.type = 'submit'
        emailShare.className = 'e btn btn-outline-dark'
        emailShare.innerHTML = 'Share via Email'
        emailShare.id = 'email_'

        inlineform.appendChild(emailShare)

        itContainer.appendChild(inlineform)
        itContainer.appendChild(selectUser)
        itContainer.appendChild(shareButton)
        itContainer.appendChild(cardDeck)

        document.body.appendChild(itContainer)

        let itID = plans[0].itinerary_id
        shareButton.id = String(itID)

        if (plans.length === 0) {
          itContainer.innerHTML = 'EMPTY ITINERARY'
        } else {
          let header = document.getElementById('header1')
          header.innerHTML = plans[0].name
          plans.forEach(data => {
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

            // DELETE FUNCTIONALITY
            let a1 = document.createElement('a')
            let a2 = document.createElement('a')

            let del = document.createElement('button')
            let edit = document.createElement('button')

            a1.href = '/plan/myplans/thisplan'
            a2.href = '/plan/editplan'

            del.className = 'del--'
            edit.className = 'edit--'

            del.id = data.plan_id
            edit.id = data.plan_id
            card.id = data.plan_id

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
        }

        let emailButt = document.getElementById('email_')
        emailButt.addEventListener('click', function () {
          alert('Succesfuly shared intinerary')
        })

        document.querySelector('#friendemail').addEventListener('input', function () {
          document.getElementById('itnum').value = plans[0].itinerary_id
        }, false)
        // Event listener for all buttons of the itineraries

        let shareBut = document.getElementsByClassName('btn btn-outline-warning')

        for (let i = 0; i < shareBut.length; i++) {
          shareBut[i].addEventListener('click', function () {
            let index = document.getElementById(String(i)).value

            if (index !== 1) {
              email = users[index - 2].email
            }

            let xhr = new XMLHttpRequest()
            xhr.open('POST', '/plan/myplans/api/share', true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({
              email_inivte: email,
              itinerarieID: shareBut[i].id

            }))
            alert('Successfully share itinerary with ' + String(users[index - 2].username))
          }, false)
        }

        // EVENT LISTENER FOR EDIT BUTTON

        let button1 = document.getElementsByClassName('edit--')

        for (let i = 0; i < button1.length; i++) {
          button1[i].addEventListener('click', function () {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', '/plan/api/editPlanForm', true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({
              value: button1[i].id
            }))
          }, false)
        }

        // EVENT LISTENER FOR DELETE BUTTON

        let button2 = document.getElementsByClassName('del--')

        for (let i = 0; i < button2.length; i++) {
          button2[i].addEventListener('click', function () {
            let xhr = new XMLHttpRequest()
            xhr.open('POST', '/plan/api/delplan', true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({
              value: button2[i].id
            }))
          }, false)
        }
      })
  })
