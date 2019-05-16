'use strict'

fetch('/api/shared')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load Database!'
    }
  })
  .then(function (users) {
    let tex = document.createTextNode(String(users.length))
    let notifications = document.getElementById('notifications')
    notifications.appendChild(tex)

    // document.body.innerHTML = users[0].SharedBy
    // document.body.innerHTML = users[1].SharedBy
  })
