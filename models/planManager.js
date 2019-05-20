'use strict'
// Return the date
let getDate = function () {
  let date = new Date()
  // let daytime = date.toISOString().slice(0, 10)
  let dd = String(date.getDate()).padStart(2, '0')
  let mm = String(date.getMonth() + 1).padStart(2, '0')
  let yyyy = date.getFullYear()

  return dd + '/' + mm + '/' + yyyy + '--' + date.getHours() + 'H' + date.getMinutes()
}
// Check if the element has been modified
let modified = function (old, new_) {
  return old !== new_
}
// Check the modification
let modificationType = function (old, new_) {
  if (!modified(old, new_)) {
    // Not Modified
    return 'N'
  } else if (modified(old, new_)) {
    if (!old && new_) {
    // Addition
      return 'A'
    } else if (old && !new_) {
    // Deletion
      return 'D'
    } else {
    // Edited
      return 'E'
    }
  }
}
// Get the modifications
let getModification = function (field, type, old, new_) {
  return { field: field, type: type, old: old, new_: new_ }
}

module.exports = {
  getDate: getDate,
  modified: modified,
  modificationType: modificationType,
  getModification: getModification
}
