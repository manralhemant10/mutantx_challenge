const userModel = require('../models/userModel.js')
const {dbpool} = require('../config/config.js')


module.exports = {
		
	create: async(dataObj)=>{
		//await dbpool.sync({ force: true });
		return await userModel.create(dataObj)
			
	},
	findByEmail: async(email)=>{
		return await userModel.findOne({ where: { email: email } });
		
	}
}