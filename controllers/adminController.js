const mongoose =  require('mongoose')
const Admin = require('../models/Admin')
const jwt= require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JWT_SECRET = process.env.JWT_SECRET

//admin
const signInAdmin = (req,res)=>{
    res.render('adminSignin')
}
const signUpAdmin = (req,res)=>{
    res.render('adminSignup')
}
const adminDashboard = (req,res)=>{
    res.render('adminDashboard')
}
const saveAdmin = async (req, res) => {  
    try {  
        const { username, password } = req.body;  
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password  
        
        user = await Admin.findOne({name : username})
        if (user){
            return res.status(400).send({message : "user already exists"})
        }
        const admin = await Admin.create({  
            name: username,  
            password: hashedPassword,  
        })
        res.status(201).json({ message: "Admin created", admin });  
    } catch (error) {
        if (error.code === 11000) {  
            return res.status(409).json({ message: "Admin already in use" });  
        }  
        console.error(error);  
        return res.status(500).json({ message: "Internal server error" });  
    }  
};  


const getAdmin = async(req,res) =>{
    try{
        const {username , password } = req.body 
        const admin = await Admin.findOne({name : username})
        if (!admin) {
            return res.json({message:"invalid username"})
        }
        isPasswordvalid = await bcrypt.compare(password,admin.password)
        if (!isPasswordvalid) {
            return res.json({message:"invalid password"})
        }
        const token = jwt.sign({userId: admin._id},JWT_SECRET)
        res.cookie('token',token,{httpOnly:true})
        res.redirect('adminDashboard')
        
    }catch(err){
        console.log(err)
    
    }
}

module.exports = {
    getAdmin,
    signInAdmin,
    signUpAdmin,
    saveAdmin,
    adminDashboard
}