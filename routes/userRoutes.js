const router = require("express").Router()
const users = require('../data/usersdata.json')

// console.log(users);
router.get('/', (req,res)=>{
    console.log(req.query);
    let filteredUsers = users.slice()
    let {name, email} = req.query;
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

module.exports = router;