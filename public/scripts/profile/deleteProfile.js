'use strict'

let deleteUser = function () {
  let _delete = null

  if (confirm('Are you sure you want to delete your profile?')) {
    _delete = true
  }else {
    _delete = false
  }
   
  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/profile/api/Delete', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify({
    _deleteUser: _delete
  }))
}
