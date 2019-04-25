'use strict'

let attributes = require('../../public/scripts/profile/manageProfile.js')

test('Can return the right size of the array', () => {

  let arraySize =  attributes.getProfileAttributes().length
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

test('A user can be deleted', () => {

    let primaryKey = "kabelo@gmail.com"
    let numbersOfUsers = attributes.size();

    attributes.delete(primaryKey)
    let expectedSize = attributes.getProfileAttributes().length

    let newNumberOfUsers = numbersOfUsers-1;

    expect(expectedSize).toEqual(newNumberOfUsers)
  })
  
  