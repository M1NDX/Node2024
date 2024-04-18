const express = require('express');
const userRoutes = require('./routes/userRoutes')
const imageRoutes = require('./routes/imageRoutes')
const path = require('path')
const app = express();
const port = 3001;


function logger(req, res, next){
    console.log("log ",req.url);
    next()
}

console.log(__dirname);

app.use(express.static(path.join(__dirname, 'public')))

//we can read the body through req.body
app.use(express.json())

app.get('/', (req,res)=>{
    res.send("hello")
})

app.use('/api/users', logger,  userRoutes )
app.use('/api/images', logger,  imageRoutes )

app.listen(port, ()=>console.log("running in port "+port) )
