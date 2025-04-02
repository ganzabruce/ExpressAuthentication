const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const controllers = require('../controllers/useControllers')

router.get('/signin',controllers.signIn)
router.get('/signup',controllers.signUp)
router.get('/adminDashboard',controllers.adminDashboard)
router.get('/userDashboard',controllers.signUp)
router.post('/signin',controllers.postSignin)
router.post('/signup',controllers.saveAdmin)
module.exports = router 