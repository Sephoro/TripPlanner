'use strict'

let validate = require('../../models/loginVerification.js')
let validate1 = require('../../models/signUpVerication.js')

let users = [ {
  email: 'eliassepuru@gmail.com',
  username: 'Elias',
  surname: 'Sepuru',
  cellphone: '0766025334',
  password: 'aswedeal',
  access_status: null
},
{
  email: 'mbongeni@gmail.com',
  username: 'Mbongeni',
  surname: 'Mankge',
  cellphone: '0769884893',
  password: '4295',
  access_status: 1
},
{
  email: 'bingi@gmail.com',
  username: 'Boikanyo',
  surname: 'Radiokana',
  cellphone: '088888888',
  password: '1234',
  access_status: null
}

]

test('User cannot login if they have not signed up', () => {
  let isRegistered = validate.isRegistered(users, 'bin@gmail.com')
  expect(isRegistered).toEqual(false)
})

test('User can login if they have signed up', () => {
  let isRegistered = validate.isRegistered(users, 'bingi@gmail.com')
  expect(isRegistered).toEqual(true)
})

test('User cannot login if they their account has been blocked', () => {
  let status = validate.isBlocked(users, 'mbongeni@gmail.com')
  expect(status).toEqual(true)
})

test('User can login if their account is not blocked', () => {
  let status = validate.isBlocked(users, 'bingi@gmail.com')
  expect(status).toEqual(false)
})

describe('the', () => {
  test('username of the user is found', () => {
    let index = validate.verifyEmail(users, 'eliassepuru@gmail.com')
    expect(index).toEqual(0)
  })

  test('password of the user is found', () => {
    let index = validate.verifyPassword(users, 'aswedeal')
    expect(index).toEqual(0)
  })

  test('password matches the username', () => {
    let index = validate.verifyEmail(users, 'mbongeni@gmail.com')
    let index2 = validate.verifyPassword(users, '4295')
    let isValid = validate.isValidCredentials(index, index2)
    expect(isValid).toEqual(true)
  })

  test('password does not match username and vice versa', () => {
    let index = validate.verifyEmail(users, 'bingi@gmail.com')
    let index2 = validate.verifyPassword(users, '4295')
    let isValid = validate.isValidCredentials(index, index2)
    expect(isValid).toEqual(false)
  })

  test('password and the username are both not found in database', () => {
    let index = validate.verifyEmail(users, 'bingiRadiokana@gmail.com')
    let index2 = validate.verifyPassword(users, '4295hdello')
    let isValid = validate.isValidCredentials(index, index2)
    expect(isValid).toEqual(false)
  })
})

describe('Check', () => {
  test('password and confrimPassword do not match', () => {
    let isPasswordMatch = validate.ValidateConfirmPassword('12345Boi', '12345Boikanyo')
    expect(isPasswordMatch).toEqual(false)
  })

  test('password and confrimPassword match', () => {
    let isPasswordMatch = validate.ValidateConfirmPassword('12345Boi', '12345Boi')
    expect(isPasswordMatch).toEqual(true)
  })
})

describe('The', () => {
  test('email is not registered on the Database', () => {
    let confirmemail = validate1.verifySignUpEmail(users, 'mbongeni921@gmail.com')
    expect(confirmemail).toEqual(true)
  })

  test('email is already being registered on the Database', () => {
    let confirmemail = validate1.verifySignUpEmail(users, 'mbongeni@gmail.com')
    expect(confirmemail).toEqual(false)
  })
})

describe('The', () => {
  test('password length is less than 8 characters', () => {
    let password = validate1.verifyLengthPassword('12345')
    expect(password).toEqual(false)
  })

  test('password length is more than 8 characters', () => {
    let password = validate1.verifyLengthPassword('12345678')
    expect(password).toEqual(true)
  })
})

describe('The', () => {
  test('number entered is invalid, contains less 10 digits', () => {
    let cellphone = validate1.verifyCellphone('12345')
    expect(cellphone).toEqual(false)
  })

  test('number entered is invalid, contains more 10 digits', () => {
    let cellphone = validate1.verifyCellphone('123456789087')
    expect(cellphone).toEqual(false)
  })

  test('number entered is valid', () => {
    let cellphone = validate1.verifyCellphone('0769884893')
    expect(cellphone).toEqual(true)
  })
})
