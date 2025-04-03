require('dotenv').config()
const express = require('express')
const app =  express()
const cookieParser =  require('cookie-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose =  require('mongoose')
const MongoStore = require('connect-mongo')
const session = require('express-session')
const routerPath =  require('./routes/router')
PORT = process.env.PORT


//connection
mongoose.connect(process.env.MONGODB_URI)
 .then(()=>{
    console.log('well connected to the database')
    app.listen(PORT,()=>{
        console.log('app instance is running')
    })
 }).catch(err=>{
    console.log('connection err ', err)
 })
//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())
app.set('view engine','ejs')


app.use(session({  
    secret: 'hello ganza',
    resave: false,  
    saveUninitialized: true, 
    store: MongoStore.create({  
        mongoUrl: process.env.MONGODB_URI  
    })
}));  
//routes

//get
app.get('/signin/admin',routerPath)
app.get('/signup/admin',routerPath)
app.get('/adminDashboard',routerPath)
app.get('/userDashboard',routerPath)

//post
app.post('/signin/admin',routerPath)
app.post('/signup/admin',routerPath)
app.post('/signin/user',routerPath)
app.post('/signup/user',routerPath)
