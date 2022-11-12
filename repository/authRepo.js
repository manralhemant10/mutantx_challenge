const userDao = require('../dao/userDao.js')
module.exports = {
	create: async(dataObj)=>{
		return await userDao.create(dataObj)
	},
	findByEmail:async(email)=>{
		return await userDao.findByEmail(email)
	}
}