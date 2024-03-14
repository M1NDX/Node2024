## branch b4-put-delete-headers-middlewares

- PUT method: update user name and email
  - `router.put('/:id', (req,res)=>{...})`
  - find the user with the `id == req.params.id` 
  - if not found, return a 404 error
  - if found 
    - validate data 
      - if not valid return a 400 error
    - update data
    - store users in the JSON file
    - respond with 200 and the updated user 
- DELETE method: delete user
  - find the user by id
  - if not found, return 404
  - if found
    - remove user from the array
    - store the users
    - respond with the deleted user
- HEADERS: 
  - read with  `req.get('header-name')`  or `req.header('header-name')`
  - write with `req.set('header-name', value)`
  - user defined header starts with and x `x-auth`
- Middlewares: functions to pre-process the request 
  - global:  in server.js `app.use(middlewareName)`
  - by route: `app.use('/users', middlewareName, usersRoute)` 
  - by endpoint: `router.get('/', middlewareName, (req,res)=>{...})`
  - Created middlewares/auth.js file
    - in auth.js export functions like `module.exports = { propName:function1, prop2Name: function2}`
    - import as an object: 
      - `const auth = require('path to the file')`
      - use it as:  `auth.propName` or `auth.prop2Name`
    - import directly the property:
      - `const {propName, prop2Name} = require('path to the file')`
      - use these directly as: `propName`, `prop2Name`
   
  