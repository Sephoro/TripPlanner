'use strict'

fetch('/plan/api/myplans/it')
  .then(function (response) {
    if (response.ok) { return response.json() } else {
      throw 'Failed to load Database!'
    }
  })
  .then(function (its) {
    let count = 0
    its.forEach(it => {
      // Create the link division
      if (count === 7) {
        count = 0
      }
      let ext = String(count) + '.jpg'
      if (count === 6) {
        ext = String(count) + '.png'
      }
      let media = document.createElement('div')
      media.className = 'media position-relative'
      media.id = String(it.ItNum)

      let img = document.createElement('img')
      img.className = 'mr-2'
      img.src = '/cdn/images/it' + ext
      img.alt = 'image'
      media.appendChild(img)

      let mediaBody = document.createElement('div')
      let h5 = document.createElement('h3')
      h5.className = 'mt-0'
      h5.innerHTML = it.name
      mediaBody.appendChild(h5)

      let p = document.createElement('p')
      p.innerHTML = 'Authored by : ' + it.email
      mediaBody.appendChild(p)

      let link = document.createElement('a')
      link.href = '/plan/myplans/thisplan'
      link.className = 'stretched-link'
      link.innerHTML = 'Go to Plans'
      mediaBody.appendChild(link)

      media.appendChild(mediaBody)
      document.body.appendChild(media)

      count++
    })

    let mediaRefs = document.getElementsByClassName('media position-relative')

    for (let i = 0; i < mediaRefs.length; i++) {
      mediaRefs[i].addEventListener('click', function () {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', '/plan/api/myplans/getitid', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify({
          it_id: mediaRefs[i].id
        }))
      }, false)
    }
  })
