const router = require("express").Router()
const e = require("express");
const {User} = require('../db/User')
const jwt = require('jsonwebtoken')

router.post('/', async(req,res)=>{
    let {email, password} = req.body;
    let user = await User.authUser(email, password)
    if(!user){
        res.status(401).send({error: "email or password not correct"})
        return
    }

    

    let token = jwt.sign({ email: user.email, _id: user._id},
                         process.env.TOKEN_KEY,
                         {expiresIn: 60 * 3} );
    
    
    res.send({token})
})


module.exports = router;