const resObj = require("../wrapper/resObj.js")

module.exports = (err,req,res,next)=>{
	let statusCode,errMsg,msg="Failure";

	if(err.name && err.name.substr(0,9)==="Sequelize"){
		statusCode = 500,errMsg = "Internal Server Error"
	}else{
		statusCode = 400, errMsg = err.message

	}
	const resErr = resObj(statusCode,msg)
	resErr.err = {
		msg: errMsg
	}
	return res.status(statusCode).send(resErr)
}