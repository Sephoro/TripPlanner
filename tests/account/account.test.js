'use strict'

let validate = require('../../models/loginVerification.js')

let users = [ {
  email: 'eliassepuru@gmail.com',
  username: 'Elias',
  surname: 'Sepuru',
  cellphone: '0766025334',
  password: 'aswedeal'
},
{
  email: 'mbongeni@gmail.com',
  username: 'Mbongeni',
  surname: 'Mankge',
  cellphone: '0769884893',
  password: '4295'
},
{
  email: 'bingi@gmail.com',
  username: 'Boikanyo',
  surname: 'Radiokana',
  cellphone: '088888888',
  password: '1234'
}

]

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
