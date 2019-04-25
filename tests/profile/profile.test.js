'use strict'

let profileAttributes = require('../../public/scripts/profile/userProfile')

test('The storage data base (profileAttributes) is not empty', () => {

  let a =  {
    name: "Elias",
    surname: "Sepuru",
    email: "eliassepuru@gmail.com",
    cellphone: "0769874566",
    password: "455445",
    confirmpassword: "454444" 
      }
      
   expect(a).toEqual(profileAttributes.get('eliassepuru@gmail.com'))


})