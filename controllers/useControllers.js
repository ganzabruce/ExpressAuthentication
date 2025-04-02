const mongoose =  require('mongoose')
const Admin = require('../models/Admin')
const User = require('../models/User')
const express  =  require('express')
const bcrypt = require('bcrypt')


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
            res.status(201).json({ message : "user created"})
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
    postSignin,
    postSignup,
    userDashboard,
    adminDashboard,
    saveAdmin
}