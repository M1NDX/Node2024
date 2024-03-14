function validateHeader(req,res, next){
    let header = req.get('x-auth')
    if(!header){
        res.status(403).send({error:"No auth data"})
        return
    }

    req.token = header;

    next()
}

function validateAdmin(req, res,next){
    let pass= '23423'
    req.admin = false
    if(req.token == pass){
        req.admin = true
    }

    next()
}

function requiredAdmin(req,res, next){
    let pass= '23423'
    req.admin = false
    if(req.token == pass){
        req.admin = true
        next()
        return;
    }

    res.status(401).send({error: 'You are not admin'})

} 



module.exports = {validateHeader, validateAdmin, requiredAdmin}

