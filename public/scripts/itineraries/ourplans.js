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
      let counter = 0
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

      // Create an add new stop button

      let addB = document.createElement('button')
      addB.className = 'add btn btn-outline-warning'
      addB.type = 'button'
      addB.setAttribute('data-toggle', 'modal')
      addB.setAttribute('data-target', '#addModal')
      addB.innerHTML = 'Add New Stop'
      addB.id = plans[0].itinerary_id + ', ' + plans[0].email

      // Owner
      let owner = document.createElement('p')
      owner.innerHTML = 'Owned by : ' + plans[0].email
      itContainer.appendChild(owner)

      // Get contributors

      let sharedWith = 'Contributors : '
      let contributes = document.createElement('p')

      fetch('/plan/api/shared/' + plans[0].itinerary_id + '')
        .then(function (response) {
          if (response.ok) { return response.json() } else {
            throw 'Failed to load itineraries!'
          }
        })
        .then(function (contributors) {
          let c = contributors[0].SharedWith
          let flag = false
          contributors.forEach(contr => {
            if (flag && contr.SharedWith !== plans[0].email) {
              c = c + ', ' + contr.SharedWith
            }

            flag = true
          })
          sharedWith = sharedWith + c
          contributes.innerHTML = sharedWith
          itContainer.appendChild(contributes)
        })

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
        location.innerHTML = '&#128205 ' + String(counter + 1) + ' ' + data.location

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

        // Ensure they are always of size three

        if (counter % 3 === 0 && counter !== 0) {
          cardDeck = document.createElement('div')
          cardDeck.className = 'card-deck'
          icardBody.appendChild(cardDeck)
        }

        // Create img element

        let img = document.createElement('img')
        img.src = '/cdn/images/roadtrip.jpg'
        img.alt = 'Card image cap'
        img.className = 'card-img-top'

        // Create edit button

        let editB = document.createElement('button')
        editB.className = 'btn btn-primary'
        editB.type = 'button'
        editB.setAttribute('data-toggle', 'modal')
        editB.setAttribute('data-target', '#editModal')
        editB.innerHTML = 'Edit'
        editB.id = data.plan_id

        // Create log collapse button
        let logB = document.createElement('button')
        logB.className = 'btn btn-outline-success log'
        let logDataToggle = 'collapse'
        logB.setAttribute('data-toggle', logDataToggle)
        let logDataTarget = '#logs' + String(data.plan_id)
        logB.setAttribute('data-target', logDataTarget)
        logB.innerHTML = 'plan log'
        logB.id = 'log' + String(data.plan_id)

        // Create the collapse

        let logDiv = document.createElement('div')
        logDiv.id = 'logs' + String(data.plan_id)
        logDiv.className = 'logDiv collapse'

        // Fetch the logs
        fetch('/plan/api/ourplans/log/' + String(data.plan_id))
          .then(function (response) {
            if (response.ok) { return response.json() } else {
              throw 'Failed to load itineraries!'
            }
          })
          .then(function (logs) {
            logs.forEach(log => {
              let logTxt = document.createElement('p')
              if (log.mod_type === 'E') {
                logTxt.innerHTML = log.mod_date + ': ' + ' ' + log.contributor + ' modified ' + ' ' + log.field + ' from ' + log.old_field + ' to ' + log.new_field
              } else if (log.mod_type === 'D') {
                logTxt.innerHTML = log.mod_date + ': ' + ' ' + log.contributor + ' deleted ' + ' ' + log.old_field + ' from ' + log.field
              } else if (log.mod_type === 'A') {
                logTxt.innerHTML = log.mod_date + ': ' + ' ' + log.contributor + ' added ' + ' ' + log.new_field + ' to ' + log.field
              }

              logDiv.appendChild(logTxt)
            })
          })

        // Append into cardbody

        cardBody.appendChild(location)
        cardBody.appendChild(date)
        cardBody.appendChild(duration)
        cardBody.appendChild(activities)
        cardBody.appendChild(editB)
        cardBody.appendChild(logB)
        cardBody.appendChild(logDiv)

        // Append into card
        card.appendChild(img)
        card.appendChild(cardBody)

        // Append into cardDEck
        cardDeck.appendChild(card)
        counter++
      })

      // Create log collapse button for the whole itinerary
      let ilogB = document.createElement('button')
      ilogB.className = 'btn btn-outline-success log'
      let logDataToggle = 'collapse'
      ilogB.setAttribute('data-toggle', logDataToggle)
      let logDataTarget = '#logs' + String(plans[0].itinerary_id)
      ilogB.setAttribute('data-target', logDataTarget)
      ilogB.innerHTML = 'itinerary log'
      ilogB.id = 'log' + String(plans[0].itinerary_id)

      // Create the collapse for the whole itinerary

      let ilogDiv = document.createElement('div')
      ilogDiv.id = 'logs' + String(plans[0].itinerary_id)
      ilogDiv.className = 'logDiv collapse'

      // Fetch the logs
      fetch('/plan/api/ourplans/itlog/' + String(plans[0].itinerary_id))
        .then(function (response) {
          if (response.ok) { return response.json() } else {
            throw 'Failed to load itineraries!'
          }
        })
        .then(function (logs) {
          logs.forEach(log => {
            let logTxt = document.createElement('p')
            if (log.mod_type === 'E') {
              logTxt.innerHTML = log.mod_date + ': ' + ' ' + log.contributor + ' modified ' + ' ' + log.field + ' from ' + log.old_field + ' to ' + log.new_field
            } else if (log.mod_type === 'D') {
              logTxt.innerHTML = log.mod_date + ': ' + ' ' + log.contributor + ' deleted ' + ' ' + log.old_field + ' from ' + log.field
            } else if (log.mod_type === 'A') {
              logTxt.innerHTML = log.mod_date + ': ' + ' ' + log.contributor + ' added ' + ' ' + log.mod_value + ' as a stop '
            }

            ilogDiv.appendChild(logTxt)
          })
        })

      itContainer.appendChild(addB)
      itContainer.appendChild(ilogB)
      itContainer.appendChild(ilogDiv)
    }

    )
    // Edit Functionality
    let editButtons = document.getElementsByClassName('btn btn-primary')

    let location = document.getElementById('elocation')
    let startDate = document.getElementById('estartDate')
    let endDate = document.getElementById('eendDate')
    let activities = document.getElementById('eactivities')
    let pID = document.getElementById('planid')
    pID.style.visibility = 'hidden'

    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', function () {
        // Be ready to edit
        let a = allPlans.filter(e => e.find(ee => {
          return ee.plan_id === Number(editButtons[i].id)
        }))
        let b = a[0].filter(e => e.plan_id === Number(editButtons[i].id))

        location.value = b[0].location
        activities.value = b[0].activities
        startDate.value = b[0].startDate
        endDate.value = b[0].endDate
        pID.value = b[0].plan_id
      }, false)
    }

    // Add new stop functionality

    let addButtons = document.getElementsByClassName('add btn btn-outline-warning')
    let itid = document.getElementById('itid')
    let emailit = document.getElementById('emailit')

    for (let i = 0; i < addButtons.length; i++) {
      addButtons[i].addEventListener('click', function () {
        itid.value = addButtons[i].id.split(',')[0]
        emailit.value = addButtons[i].id.split(',')[1]
      })
    }
  })
