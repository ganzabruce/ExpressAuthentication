require('dotenv').config()
const express = require('express')
const app =  express()
const cookieParser =  require('cookie-parser')
const mongoose =  require('mongoose')
const MongoStore = require('connect-mongo')
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
app.set('view engine','ejs')


app.use(session({ 
    secret: 'hello ganza',
    resave: false,
    saveUnitialised: true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
}))
//routes
app.get('/signin',routerPath)
app.get('/signup',routerPath)
app.get('/adminDashboard',routerPath)
app.post('/signin',routerPath)
app.post('/signup',routerPath)
