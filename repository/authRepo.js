const userDao = require('../dao/UserDao.js')
module.exports = {
	create: async(dataObj)=>{
		return await userDao.create(dataObj)
	},
	findByEmail:async(email)=>{
		return await userDao.findByEmail(email)
	}
}