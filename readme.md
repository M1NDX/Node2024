## Branch: b5-public-static-fetch

- static files
  - create a "public" folder
    - add a `index.html` 
    - in `server.js` specify where is your public folder
      - `app.use(express.static(__dirname+'/public'))`
- fetch data
  - create an asynchronous function 
    - `async function  getUsers(){...}`
    - use fetch to get the response and parse the response to json 
        - `let resp = await fetch('/api/users')`
        - `let data = await resp.json()`
        - check the response status `resp.status`
- Read value from an input 
  - find the input 
    - `let id= document.querySelector('#id').value`
    - `let id= document.getElementById('id').value`
  - handler for the event `onclick`
    - in the button `<button onclick="getUsers()">`
- Add user (post method)
  - after reading the values from the inputs 
  - set a handler to the event `onsubmit` in the form 
    - `<form onsubmit="saveUser()">`
    - avoid refresh of the page in the *async* function `saveUsers`
      - set `event.preventDefault()` in the first line
    - use the fetch  
    ```js
      //read name and email values 
      const name = document.querySelector('name').value
      const email = document.querySelector('email').value
      //validate data
      ...
      //create the body:
      const newUser = {name, email};
      const body = JSON.stringify(newUser);
      //headers
      const headers = {
        'x-auth': 31423,
        'Content-type': 'Application/json'
      }

      const resp = await fetch('/api/users', {
        method: 'POST',
        headers,
        body
      })
      
      const data= await resp.json()

      ```
