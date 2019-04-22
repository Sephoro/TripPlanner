'use strict'

fetch(' ')
  .then(function () {
    let paragraph = document.createElement('p')
    let text = document.createTextNode('You can create your iteneraries here')
    paragraph.appendChild(text)
    document.body.appendChild(paragraph)
  })
