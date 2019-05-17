'use strict'

fetch('/api/shared')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load Database!'
    }
  })
  .then(function (users) {
    let counter = 0
    // Get Modal body
    let modalbody = document.getElementById('modalbody')

    for (let i = 0; i < users.length; i++) {
      if (users[i].stat !== 0 && users[i].stat !== 1) {
        counter++
        let para = document.createElement('p')
        let tex = document.createTextNode(String(users[i].SharedBy) + ' would like to share an itinerary with you?')
        para.appendChild(tex)
        let br = document.createElement('br')
        modalbody.appendChild(br)
        modalbody.appendChild(para)

        let buttonDiv = document.createElement('div')
        buttonDiv.className = 'btn-group btn-group-sm'
        // Accept Button
        let acceptButton = document.createElement('button')
        acceptButton.id = 'a' + String(users[i].ItineraryID)
        acceptButton.href = '#'
        tex = document.createTextNode('Accept')
        acceptButton.className = 'btn btn-default'
        acceptButton.appendChild(tex)
        // Reject Button
        let rejectButton = document.createElement('button')
        rejectButton.id = 'r' + String(users[i].ItineraryID)
        rejectButton.className = 'btn btn-default'
        tex = document.createTextNode('Reject')
        rejectButton.appendChild(tex)
        rejectButton.href = '#'

        buttonDiv.appendChild(acceptButton)
        buttonDiv.appendChild(rejectButton)
        modalbody.appendChild(buttonDiv)
      }
    }
    // NOtifications
    let tex = document.createTextNode(String(counter))
    let notifications = document.getElementById('notifications')
    notifications.appendChild(tex)

    let modButtons = document.getElementsByClassName('btn btn-default')
    for (let i = 0; i < modButtons.length; i++) {
      modButtons[i].addEventListener('click', function () {
        let id = modButtons[i].id.substring(1, modButtons[i].id.length)
        let xhr = new XMLHttpRequest()
        xhr.open('POST', '/api/notifications', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({
          status: modButtons[i].id[0],
          itID: id

        }))
      }, false)
    }
  })
