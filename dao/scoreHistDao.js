const {scoreHistModel} = require('../models/scoreHistModel.js')
const {dbpool} = require('../config/config.js')

module.exports = {

	create: async(dataObj)=>{
		await scoreHistModel.create(dataObj)	
	},
	getScore: async(email, offset, limit)=>{
		return await scoreHistModel.findAll({offset,limit,where: { email: email } })
	},
	getAllScore: async(offset, limit)=>{
		return await scoreHistModel.findAll({
			offset,
			limit
		})
	}
}