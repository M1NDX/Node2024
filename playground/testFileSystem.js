const fs = require('fs')

let users = require('../data/usersdata.json')

users.push({name: "testAdd", email: "testemail@test", uid: 0 })

fs.writeFileSync('./data/usersdata.json', JSON.stringify(users) )