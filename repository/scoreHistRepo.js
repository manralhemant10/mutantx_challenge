const scoreHistDao = require('../dao/scoreHistDao.js')

module.exports = {
	getScore: async(queryObj)=>{
		let  offset = 0,limit=50;
		if(queryObj.offset)offset=parseInt(queryObj.offset)
		if(queryObj.limit)limit=parseInt(queryObj.limit)
		if(queryObj.userid){
			const res = await scoreHistDao.getScore(queryObj.userid, offset, limit)
			if(res===null)throw new Error("No such user exists")
			return res
		}
		else{
			return await scoreHistDao.getAllScore(offset, limit)
		}
	}

}