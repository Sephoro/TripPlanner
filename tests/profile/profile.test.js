'use strict'
let passwordRes = require('../../models/ResetPassword')
// password reset functionality

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

