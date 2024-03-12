const router = require("express").Router()
const users = require('../data/usersdata.json')
const {nanoid} = require('nanoid')
const fs = require('fs')

// console.log(users);
router.get('/', (req,res)=>{
    console.log(req.query);
    let filteredUsers = users.slice()
    let {name, email, minId, maxId, pageSize, pageNumber} = req.query;
    console.log(name, email);
    if(name){
        filteredUsers = filteredUsers.filter(u => 
                    u.name.toUpperCase().includes(name.toUpperCase())
                    )
    }

    if(email){
        filteredUsers = filteredUsers.filter(u => 
                    u.email.toUpperCase().includes(email.toUpperCase())
                    )
    }
    if(minId){
        filteredUsers = filteredUsers.filter(u => u.id >= minId)
    }
    if(maxId){
        filteredUsers = filteredUsers.filter(u => u.id <= maxId)
    }

    pageSize = pageSize ?? 3
    pageNumber = pageNumber ?? 1

    let minIndex = (pageNumber-1)*pageSize

    filteredUsers = filteredUsers.slice(minIndex, minIndex+pageSize)

    // pageSize = pageSize? pageSize: 3



    res.send(filteredUsers)
})



router.get('/:uid', (req, res)=>{
    console.log(req.params.id);
    let user = users.find(u=> u.id == req.params.uid )
    if (!user){
        res.status(404).send({error: "User not found"})
        return;
    }
    res.send(user)
})


// this will never be reached
router.get('/:email', (req, res)=>{
    console.log(req.params.email);
    // let user = users.find(u=> u.id == req.params.uid )
    // if (!user){
    //     res.status(404).send({error: "User not found"})
    //     return;
    // }
    res.send({})
})


router.post('/', (req,res)=>{
    console.log(req.body);
    let {name, email } = req.body;
    if( name && name.trim() && email && email.trim() ){
        
        let user = users.find(u => u.email == email)
        if(user){
            res.status(400).send({error: 'User exists'})
            return 
        }

       
        let userObj = {name, email, uid: nanoid(6)  }
        users.push(userObj)
        fs.writeFileSync('./data/usersdata.json', JSON.stringify(users) )

        res.send(userObj)
        return
    }

    let error = ''
    if(name == undefined || !name.trim())
        error += 'name is invalid;'
    if(email == undefined || !email.trim())
        error += 'email is invalid'

    res.status(400).send({error})

})

router.put('/:id', (req,res)=>{
    //search for the id

    //if not found 
        // return 404 not found 

    //if found
        // update data 

        // store data in file

        // return the updated object
})

router.delete('/:id', (req, res)=>{
    // search for the id

    // if not found return 404

    // if found
        //delete object 
        //update file
        //return deleted object 
})

module.exports = router;