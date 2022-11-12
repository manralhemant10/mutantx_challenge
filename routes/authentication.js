const router = require('express').Router()
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const authController = require('../controller/authController')
const tryCatch = require('../wrapper/tryCatch')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());

router.post('/signup',tryCatch(async(req,res)=>{
	await authController.signup(req,res);
 	//send confirmation link to email
}))

router.post('/login',tryCatch(async(req,res)=>{
	await authController.login(req,res);
}))

module.exports = router

