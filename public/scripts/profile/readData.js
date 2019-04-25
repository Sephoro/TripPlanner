
let data = require('./userProfile.js')
let b = 'eliassepuru@gmail.com'
// let a = data.get(b)

// let b = a.filter(entry => entry.name ==='Elias')

let a =  { name: 'Mbongeni',
surname: 'Mankge',
email: 'eliassepuru@gmail.com',
cellphone: '0769874566',
password: '455445',
confirmpassword: '454444' }

data.edit(a, b)

console.log(data.getProfileAttributes())