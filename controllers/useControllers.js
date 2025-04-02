const mongoose =  require('mongoose')
const Admin = require('../models/Admin')
const User = require('../models/User')
const express  =  require('express')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JWT_SECRET = process.env.JWT_SECRET


const signIn = (req,res)=>{
    res.render('signin')
}
const userDashboard = (req,res)=>{
    res.render('userDashboard')
}
const adminDashboard = (req,res)=>{
    res.render('adminDashboard')
}

const signUp = (req,res)=>{
    res.render('signup')
}


const saveAdmin = async (req,res)=>{
    try {
        
        const { username ,password } =  req.body
        const hashedPassword  = await bcrypt.hash(password,10)
        try {
            const admin = await Admin.create({
                name: username,
                password: hashedPassword
            })
            res.status(201).json({ message : "user created" , admin})
            res.redirect('/adminDashboard')
        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({message:"user already in use"})
            }
            res.status(500).json({message : "internal server error"})
        }
        res.render('signup')
    } catch (error) {
        console.log(error)
    }
}


const getAdmin = async(req,res) =>{
    try{
        const {username , password } = req.body 
        const user = await Admin.findOne({name : username})
        if (!user) {
            return res.json({message:"invalid username"})
        }
        isPasswordvalid = await bcrypt.compare(password,user.password)
        if (!isPasswordvalid) {
            return res.json({message:"invalid password"})
        }
        const token = jwt.sign({userId: user._id},JWT_SECRET)
        res.cookie('token',token,{httpOnly:true})
        res.redirect('adminDashboard')
    
    }catch(err){
        console.log(err)
    }
}




const postSignin = (req,res)=>{
    var { username ,password} = req.body
    res.redirect('/adminDashboard')
}
const postSignup = (req,res)=>{
    var { username ,password} = req.body
    console.log(req.body)
}

module.exports = {
    signIn,
    signUp,
    getAdmin,
    postSignup,
    userDashboard,
    adminDashboard,
    saveAdmin
}