const mongoose =  require('mongoose')
const signIn = (req,res)=>{
    res.render('signin')
}
const signUp = (req,res)=>{
    res.render('signup')
}
const postSignin = (req,res)=>{
    var { username ,password} = req.body
    console.log(req.body)
}
const postSignup = (req,res)=>{
    var { username ,password} = req.body
    console.log(req.body)
}

module.exports = {
    signIn,
    signUp,
    postSignin,
    postSignup
}