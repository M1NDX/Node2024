const express = require('express');
const userRoutes = require('./routes/userRoutes')
const app = express();
const port = 3000;


function logger(req, res, next){
    console.log("log ",req.url);
    next()
}



//we can read the body through req.body
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("hello")
})

app.use('/users', logger,  userRoutes )

app.listen(port, ()=>console.log("running in port "+port) )
