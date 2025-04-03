const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const Post = require('../models/post')

//admin
const signInUser = (req,res)=>{
    res.render('signinUser')
}
const signUpUser = (req,res)=>{
    res.render('signupUser')
}
const userDashboard = async(req,res)=>{
    try {
        const userToken = req.cookies.userToken
        const verifiedUser = jwt.verify(userToken,JWT_SECRET)
        const user = await User.findById(verifiedUser.userId)
        const posts = await Post.find()
        res.render('userDashboard', { userName: user.name,posts });

    } catch (error) {
        console.log(error)
    }
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
            res.redirect('/signup/user')
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
const addPost = (req,res)=>{
    res.render('createPost')
}
const submitPost = async (req,res) =>{
    try {
        const userToken = req.cookies.userToken;
        const verifiedUser = jwt.verify(userToken, JWT_SECRET)
        const user = await User.findById(verifiedUser.userId);
        const userName = user.name
        const {postTitle , postBody} = req.body
        try {
            const post = await new Post({
                postTitle: postTitle,
                postBody: postBody,
                createdBy: userName
            })
            post.save()
             .then(()=>{
                 res.redirect('/userDashboard')
             }).catch(err=>{
                console.log('error saving post')
             })
            
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

const getPostDetails = async(req,res)=>{
    const postId = req.params.id
    try {
        const post = await Post.findById(id)
        res.render('postDetails',{post})
    } catch (error) {
        
    }
}
module.exports = {
    getUser,
    saveUser,
    signInUser,
    signUpUser,
    userDashboard,
    addPost,
    submitPost,
    getPostDetails
}