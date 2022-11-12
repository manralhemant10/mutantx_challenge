const scoreHistRepo = require('../repository/scoreHistRepo.js')
const resObj = require('../wrapper/resObj.js')

module.exports = {
	getScore: async(req,res)=>{
		if(req.params.userid){
				req.query.userid = req.params.userid
		}
		const userScores = await scoreHistRepo.getScore(req.query)
		return res.status(200).json(resObj(200,"Success",userScores))
		
	}
}