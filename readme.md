## Branch b2: userRoute-params-query

Covered topics:

- scripts in package.json
  - start
  - dev
- nodemon 
  - the package is installed globally:  `npm i -g nodemon`
- Router in different files
- params `/:id`
  - `req.params`
- query params `?name=alex&age=23`
  - `req.query`
- response status
  - `res.status(401).send({error: 'user not found'})`
- test our project using rest client
  - test.http
- read a json file
  - `let users = require('../data/usersData.json')`

The project now can be executed using any of these 3 options: 

1. `node server.js`
2. `node .`
3. `npm start`
   
You can also execute the project by using nodemon:

1. `nodemon server.js`
2. `nodemon .`
3. `nodemon run dev`

