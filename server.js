require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/userRoutes')
const imageRoutes = require('./routes/imageRoutes')
const authRoutes = require('./routes/authRoute')
const path = require('path')
const app = express();
const port = process.env.PORT || 3001;

const {User} = require('./db/User')

//------HANDLEBARS---------------
const hbs = require("express-handlebars")

app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views/layouts')
}) )

app.set('view engine', 'hbs')


////-------------


app.use(cookieParser())
// req.cookie  res.cookie

function logger(req, res, next){
    console.log("log ",req.url);
    next()
}

console.log(__dirname);

app.use(express.static(path.join(__dirname, 'public')))
// app.use('/users/:id',express.static(path.join(__dirname, 'public/users')))

//we can read the body through req.body
app.use(express.json())

app.get('/', (req,res)=>{
    res.render('home', {name: 'Sora'})
})

app.get('/users-list', async (req,res)=>{
    const docs = await User.findUsers()
    const users = JSON.parse(JSON.stringify(docs.users))
    console.log(users);
    res.render('usersList', {name:"Juan", users})
})

app.use('/api/users', logger,  userRoutes )
app.use('/api/images', logger,  imageRoutes )
app.use('/api/auth', logger,  authRoutes )

//all others routes are sended to / (home)
app.use('*', (req,res)=>{
    res.redirect('/')
} )

app.listen(port, ()=>console.log("running in port "+port) )
