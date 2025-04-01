require('dotenv').config()
const express = require('express')
const app =  express()
const cookieParser =  require('cookie-parser')
const mongoose =  require('mongoose')
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
app.set('view engine','ejs')
//routes
app.get('/signin',routerPath)
app.get('/signup',routerPath)
app.post('/signin',routerPath)
app.post('/signup',routerPath)
