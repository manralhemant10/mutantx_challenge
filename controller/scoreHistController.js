const scoreHistRepo = require('../repository/scoreHistRepo.js')
const resObj = require('../wrapper/resObj.js')

module.exports = {
	getScore: async(req,res)=>{
		if(req.query.userId){
				const userScores = await scoreHistRepo.getScore(req.query.userId)
				return res.status(200).json(resObj(200,"Success",userScores))
		}else{
			const allScore = await scoreHistRepo.getScore(req.query)
			return res.status(200).json(resObj(200,"Success",allScore))
		}
		
	}
}