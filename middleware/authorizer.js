const jwt = require('jsonwebtoken')
const {JWT_SECRET_KEY} = require('../config/config.js')

const authorizer =  (req,res,next)=>{
	const bearerToken = req.headers['authorization']
	if(!bearerToken)  return res.status(403).send("A token is required for authentication");

	const token = bearerToken.substr(7)
	const decoded = jwt.verify(token,JWT_SECRET_KEY)
	if(decoded){
		req.body.email = decoded.email
		next()
	}
	else return res.status(401).send("Invalid Token");
}
module.exports = authorizer