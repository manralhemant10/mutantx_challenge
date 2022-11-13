const scoreHistRepo = require('../repository/scoreHistRepo.js')
const resObj = require('../wrapper/resObj.js')

module.exports = {
	getScore: async(req,res)=>{
		if(req.params.userid){
				req.query.userid = req.params.userid
		}
		const userScores = await scoreHistRepo.getScore(req.query)
		if(userScores.length===0)return res.status(404).json(resObj(404,"No such user exists"))
		return res.status(200).json(resObj(200,"Success",userScores))
		
	}
}