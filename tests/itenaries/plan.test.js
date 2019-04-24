'use strict'
let pf = require('../../public/scripts/itineraries/planFunctions.js')

// durationCalculator tests
describe('Can calculate days of dates differing by', () => {
  test('a single day', () => {
    let date1 = new Date('2018/01/01')
    let date2 = new Date('2018/01/02')
    expect(pf.durationCalculator(date2, date1).days).toEqual(1)
  })
  test('more than a single day', () => {
    let date1 = new Date('2018/01/01')
    let date2 = new Date('2018/01/05')
    expect(pf.durationCalculator(date2, date1).days).toEqual(4)
  })
})

describe('Knows that', () => {
  test('a single day is a "day"', () => {
    let date1 = new Date('2018/01/01')
    let date2 = new Date('2018/01/02')
    expect(pf.durationCalculator(date2, date1).string).toEqual(' day')
  })

  test('more than 1 day is a "days"', () => {
    let date1 = new Date('2018/01/01')
    let date2 = new Date('2018/01/05')
    expect(pf.durationCalculator(date2, date1).string).toEqual(' days')
  })
})

// Validate duration date
describe('The start date', () => {
  test('must be earlier than the end date', () => {
    let startDate = new Date('2018/01/06')
    let endDate = new Date('2018/01/01')
    expect(pf.validDate(pf.durationCalculator(endDate, startDate).days)).not.toBeTruthy()
  })

  test('must be later than the end date', () => {
    let startDate = new Date('2018/01/01')
    let endDate = new Date('2018/01/06')
    expect(pf.validDate(pf.durationCalculator(endDate, startDate).days)).toBeTruthy()
  })
})

// Valid number of activities tests
describe('Activities that are', () => {
  test('less than or equal to five are acceped', () => {
    let activities = 'one, two, three, four, five'
    expect(pf.validActivities(activities)).toBeTruthy()
  })

  test('greater  five are rejected', () => {
    let activities = 'one, two, three, four, five, six'
    expect(pf.validActivities(activities)).not.toBeTruthy()
  })
})
