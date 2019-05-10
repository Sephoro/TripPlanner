'use strict'
let passwordRes = require('../../models/ResetPassword')
let profileManager = require('../../models/profileManager')

//profile manager tests 
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


// password reset functionality tests
test('Password verification method returns true when passwords match', () => {

  let user = {
    name: 'masalane',
    surname: 'maroga',
    password: 'masalane01'
  }
  let password = 'masalane01'
  let expectedBoolean = true
  expect(expectedBoolean).toEqual(passwordRes.verifyPassword(user, password))
})

test('Password verification method returns false when passwords does not match', () => {

  let user = {
    name: 'masalane',
    surname: 'maroga',
    password: 'masalane'
  }
  let password = 'masalane01'
  let expectedBoolean = false
  expect(expectedBoolean).toEqual(passwordRes.verifyPassword(user, password))
})

test('Boolean true is returned when the new passowrd match with the confirmation password', () => {

  let newPassword = 'masalane01'
  let confirmPassword = 'masalane01'
  let expectedBoolean = true
  expect(expectedBoolean).toEqual(passwordRes.verifyNewPassword(newPassword, confirmPassword))
})

test('Boolean false is returned when the new passowrd does not match with the confirmation password', () => {

  let newPassword = 'masalane01'
  let confirmPassword = 'masalane'
  let expectedBoolean = false
  expect(expectedBoolean).toEqual(passwordRes.verifyNewPassword(newPassword, confirmPassword))
})

