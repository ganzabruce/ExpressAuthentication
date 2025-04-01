const mongoose =  require('mongoose')
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
    adminDashboard
}