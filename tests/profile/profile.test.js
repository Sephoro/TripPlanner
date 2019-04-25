'use strict'

let attributes = require('../../public/scripts/profile/manageProfile.js')

test('Can return the right size of the array', () => {

  let arraySize = 3
  expect(arraySize).toEqual(attributes.size())
})

test('Can return an element at the primary key of the email address', () => {
  
  let primaryKey = "kabelo@gmail.com"
  
  let user = {
    name: "kabelo",
    surname: "maroga",
    email: "kabelo@gmail.com",
    cellphone: "0769874566",
    password: "455445",
    confirmpassword: "454444"
}

  expect(user).toEqual(attributes.get(primaryKey)[0])
})

test('Can return the whole array of users', () => {

  let users = attributes.getProfileAttributes(); 
  let expectedLength = 3

  expect(users.length).toEqual(expectedLength)  
})

test('Can edit a user with the given primary key', () => {

  let edited = {
    name: "Masalane",
    surname: "Maroga",
    email: "kabelo@gmail.com",
    cellphone: "0769874566",
    password: "455445",
    confirmpassword: "454444"
  }

attributes.edit(edited,"emsepuru@gmail.com")

expect(edited).toEqual(attributes.get("kabelo@gmail.com")[0])

})