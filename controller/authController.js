const {emailValidator} = require('../validators/validator.js')
const authRepo = require('../repository/authRepo.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config/config.js')
const resObj = require('../wrapper/resObj')

const authController = {
	signup: async(req,res)=>{
		const {email, password} = req.body
		if(email && password){
				await emailValidator(email)
				const exists = await authRepo.findByEmail(email)
				if(exists){
					throw new Error("User already Exist")
				}
					
				const salt = await bcrypt.genSalt(10);
			    const pwd = await bcrypt.hash(password, salt)
			    const data = await authRepo.create({
			    	email: email, 
			    	password: pwd
			    })
			    delete data.dataValues.password
			    res.status(201).send(resObj(201,"User Created",data.dataValues))
			    //email verification
		}
	},
	login:async(req,res)=>{
		console.log(JWT_SECRET_KEY)
		const {email, password} = req.body
		if(email && password){
				await emailValidator(email)
				const userInfo = await authRepo.findByEmail(email)
			
			    if(userInfo===null)throw new Error("No such user exist")

				const salt = await bcrypt.genSalt(10);
			    const pwd = await bcrypt.hash(password, salt)

			    const isMatch = await bcrypt.compare(password, userInfo.dataValues.password)
			     if(isMatch){
			     	const token = jwt.sign({
			     		email
			     	},JWT_SECRET_KEY,{ expiresIn: '1h' })

			    	res.status(200).send(resObj(200,"Success",{token}))
			    }else{
			    	throw new Error("User and password does not match")
			    }
		}
	}
}

module.exports = authController