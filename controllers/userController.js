const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

//admin
const signInUser = (req,res)=>{
    res.render('signinUser')
}
const signUpUser = (req,res)=>{
    res.render('signupUser')
}
const userDashboard = (req,res)=>{
    res.render('userDashboard')
}
const saveUser = async (req,res)=>{
    try {    
        const { username ,password } =  req.body
        const hashedPassword  = await bcrypt.hash(password,10)
        const usertest  = await User.findOne({name : username})
        if(usertest){
            return res.status(400).json({message :  "user already exists"})
        }
        try {
            const user = await User.create({
                name: username,
                password: hashedPassword
            })
            res.status(201).json({ message : "user created" , user})
            res.redirect('/adminDashboard')
        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({message:"user already in use"})
            }
            res.status(500).json({message : "internal server error"})
        }
        res.render('signupUser')
    } catch (error) {
        console.log(error)
    }
}


const getUser= async(req,res) =>{
    try{
        const {username , password } = req.body 
        const user = await User.findOne({name : username})
        if (!user) {
            return res.json({message:"invalid username"})
        }
        isPasswordvalid = await bcrypt.compare(password,user.password)
        if (!isPasswordvalid) {
            return res.json({message:"invalid password"})
        }
        const userToken = jwt.sign({userId: user._id},JWT_SECRET)
        res.cookie('userToken',userToken,{httpOnly:true})
        res.status(200).redirect('/userDashboard')
        
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getUser,
    saveUser,
    signInUser,
    signUpUser,
    userDashboard
}