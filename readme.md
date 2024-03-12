## Branch: b3-userRoute-post

### Topics covered: 

  - Query params
    - minId, maxId 
    - pageNumber, pageSize
      - set default values to these variables
        - use the nullish coalescing operator (`??`)
        - >logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
  - Post method
    - use express.json() on server file
    - read `req.body` on post method
    - test with `.http` file
    - validate properties
    - generate id using nanoid@3.0.0
    - use the  file system `fs`
    - write the users to a file 
      - `fs.writeFileSync(path, string data)`
      - validate that the user doesn't exist
    - if the user exists, return an error (status 400)
  