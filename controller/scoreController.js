const scoreRepo = require('../repository/scoreRepo.js')
const resObj = require('../wrapper/resObj.js')

const getScore =  async(req,res)=>{
		if(req.params.userid){
				const userScores = await scoreRepo.getScore(req.params)
				if(userScores===null)return res.status(404).json(resObj(404,"No such user exists"))
				return res.status(200).json(resObj(200,"Success",userScores))
		}else{
			const allScore = await scoreRepo.getScore(req.query)
			return res.status(200).json(resObj(200,"Success",allScore))
		}
		
}

const addScore = async(req,res)=>{
			const {score,email} = req.body
			if(score){
				if(score===20 || score===60 || score===100){
					const userScores = await scoreRepo.getScore({userid:email})
					let data;
					if(!userScores){
						data = await scoreRepo.create({
							email,
							score
						})
					}else{
						data = await scoreRepo.update(email,score)
					}
					res.status(201).send(resObj(201,"Score Updated",data))
				}else{
					throw new Error("Invalid Score")
				}
			}
			else{
				throw new Error("Invalid data")
			}
		
}

module.exports = {
	addScore,
	getScore
}