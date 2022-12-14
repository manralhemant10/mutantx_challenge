const scoreDao = require('../dao/scoreDao.js')
const scoreHistDao = require('../dao/scoreHistDao.js')
const {dbpool} = require('../config/config.js')

const getScore = async(queryObj)=>{
		if(queryObj.userid){
			const res = await scoreDao.getScore(queryObj.userid)
			if(res===null)	return res
			const rank = await scoreDao.getRank(queryObj.userid) 
			res.dataValues._rank=rank+1
			return res.dataValues
			
		}
		else{
			let offset=0,limit=50;
			if(queryObj.offset)offset = parseInt(queryObj.offset)
			if(queryObj.limit)limit = parseInt(queryObj.limit)
			const allScores = await scoreDao.getAllScore()
			if(allScores.length===0)return allScores
			let newAllScores=[]
			let rank = 1,len = allScores.length;
			allScores[0].dataValues._rank=rank;
			if(offset===0){
				newAllScores.push(allScores[0].dataValues)
			}
			let loopTill = Math.min(len,offset+limit)

			for(let i=1;i<loopTill;i++){
				while(i<loopTill && allScores[i].dataValues.score===allScores[i-1].dataValues.score){
					allScores[i].dataValues._rank=rank;
					if(i>=offset)
					newAllScores.push(allScores[i].dataValues)

				}
				if(i<loopTill){
					allScores[i].dataValues._rank=++rank;
					if(i>=offset)
					newAllScores.push(allScores[i].dataValues)

				}
			}
			return newAllScores
		}
	}

const update =  async(email,score)=>{
		const dataObj = {score:+score}
		const condition = {
				where:{
					email:email
				}
		}
		const res = await scoreDao.update(dataObj,condition)
		const rank = await scoreDao.getRank(email) 
		res.dataValues._rank=rank+1
		return res
		
}
const create = async(dataObj)=>{
	const res = await scoreDao.create(dataObj)
	const rank = await scoreDao.getRank(dataObj.email) 
		res.dataValues._rank=rank+1
		return res
}
module.exports = {
	update,
	getScore,
	create
}