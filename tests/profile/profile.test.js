'use strict'
let profileManager = require('../../models/profileManager')

describe('It is known when', () => {
  let oldEmail = 'elias@sepuru.co.za'

  test('A user does not change their email when they edit their profile', () => {
    let newEmail = 'elias@sepuru.co.za'
    expect(profileManager.emailChanged(oldEmail, newEmail)).toEqual(false)
  })
  test('A user changes their email when they edit therir profile', () => {
    let newEmail = 'elias@sepuru.com'
    expect(profileManager.emailChanged(oldEmail, newEmail)).toEqual(true)
  })
})

describe('When the user edits their profile they ', () => {
  // Mock database
  let users = [
    {
      name: 'Elias',
      surname: 'Sepuru',
      contact: '071234628',
      email: 'elias@sepuru.com'
    },
    {
      name: 'Mbongeni',
      surname: 'Mankge',
      contact: '07109000',
      email: 'mbongeni@mankge.com'
    },
    {
      name: 'Bingi',
      surname: 'Sepuru',
      contact: '07167788',
      email: 'bingi@sepuru.co.za'
    }
  ]

  test('Are allowed to change their email to an email that does not exists', () => {
    let newEmail = 'bingi@sepuru.com'
    let oldEmail = users[2].email
    expect(profileManager.emailAlreadExists(newEmail, oldEmail, users)).toEqual(false)
  })
  test('Not allowed to change their email to an email that already exists', () => {
    let newEmail = 'elias@sepuru.com'
    let oldEmail = users[1].email
    expect(profileManager.emailAlreadExists(newEmail, oldEmail, users)).toEqual(true)
  })
  test('Keep their email the same', () => {
    let newEmail = 'elias@sepuru.com'
    let oldEmail = users[0].email
    expect(profileManager.emailAlreadExists(newEmail, oldEmail, users)).toEqual(false)
  })
})
