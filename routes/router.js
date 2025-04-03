const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const adminControllers = require('../controllers/adminController')
const userControllers = require('../controllers/userController')


//get
//forms
router.get('/signin/admin',adminControllers.signInAdmin)
router.get('/signup/admin',adminControllers.signUpAdmin)
router.get('/signin/user',userControllers.signInUser)
router.get('/signup/user',userControllers.signUpUser)

//pages
router.get('/adminDashboard',adminControllers.adminDashboard)
router.get('/userDashboard',userControllers.userDashboard)


//post
router.post('/signin/admin',adminControllers.getAdmin)
router.post('/signup/admin',adminControllers.saveAdmin)
router.post('/signin/user',userControllers.getUser)
router.post('/signup/user',userControllers.saveUser)
module.exports = router 