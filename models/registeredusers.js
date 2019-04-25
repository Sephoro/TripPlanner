const fs = require('fs')
const path = require('path')

const pathdir = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'userdata.json'
)

const getUserfromFile = (cd) => {
  fs.readFile(pathdir, (err, fileContent) => {
    if (err) {
      cd([])
    } else {
      cd(JSON.parse(fileContent))
    }
  })
}

module.exports = class reqistereduser {
  constructor (name, surname, email, cellphone, password, confirmpassword) {
    this.name = name
    this.surname = surname
    this.email = email
    this.cellphone = cellphone
    this.password = password
    this.confirmpassword = confirmpassword
  }

  savenewuser () {
    getUserfromFile(userdata => {
      userdata.push(this)
      fs.writeFile(pathdir, JSON.stringify(userdata), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAllusers (cd) {
    getUserfromFile(cd)
  }
}
