'use strict'

// calculate the duration
let durationCalculator = function (date1, date2) {
  let days = (new Date(date1) - new Date(date2)) / (3600 * 1000 * 24)

  if (days === 1) {
    return { string: ' day', days: days }
  }
  return { string: ' days', days: days }
}
// Validate date
let validDate = function (duration) {
  if (duration < 0) {
    return false
  } else {
    return true
  }
}
// Validate Number of activities
let validActivities = function (activities) {
  if (activities.split(',').length > 5) {
    return false
  } else {
    return true
  }
}

module.exports = {
  durationCalculator: durationCalculator,
  validDate: validDate,
  validActivities: validActivities
}
