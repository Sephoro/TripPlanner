'use strict'
let session = require('../../models/sessions.js')

describe('It is known when', () => {
  test('a user is not logged in', () => {
    expect(session.loggedIn()).toEqual(false)
  })
  test('a user is logged in', () => {
    let user = 'elias.sepuru@xmail.co.za'
    session.setUser(user)
    expect(session.loggedIn()).toEqual(true)
  })
})

describe('It is known', () => {
  let user = 'elias.sepuru@xmail.co.za'
  test('who logged in', () => {
    session.setUser(user)
    expect(session.getUser()).toEqual(user)
  })
  test('when a user logs out', () => {
    session.setUser(null)
    expect(session.loggedIn()).toEqual(false)
  })
})
