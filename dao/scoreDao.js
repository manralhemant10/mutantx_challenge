const {scoreModel} = require('../models/scoreModel.js')
const {dbpool} = require('../config/config.js')
const { QueryTypes } = require('sequelize');
const scoreHistDao = require('./scoreHistDao.js')

const getScore = async(email)=>{
	console.log(email)
		return await scoreModel.findOne({ where: { email: email } });
}
const getRank = async(email)=>{
		const query = `select count(*) as _rank from current_scores a, current_scores b where a.email = '${email}' and a.score < b.score`
		const res = await dbpool.query(query,{ type: QueryTypes.SELECT })
		return res[0]._rank
}

const update =  async(dataObj,condition)=>{

		await dbpool.transaction(async (t) => {
			const histObj = await getScore(condition.where.email)
			const _rank = await getRank(condition.where.email)
			await scoreHistDao.create({
				email:histObj.email,
				score:histObj.score,
				_rank:_rank+1
			},{ transaction: t })
			
			await scoreModel.increment(dataObj, condition,{transaction:t});	

		})

}

const getAllScore = async()=>{
		return await scoreModel.findAll({
			order: [
            	['score', 'DESC'],
        	]
		})
}

const create = async(dataObj)=>{
	return await scoreModel.create(dataObj)
}

module.exports = {
	update,
	getScore,
	getAllScore,
	getRank,
	create

}