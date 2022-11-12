const router = require('express').Router()
const bodyParser = require('body-parser')
const scoreController = require('../controller/scoreController')
const tryCatch = require('../wrapper/tryCatch')
const authorizer = require('../middleware/authorizer')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());


router.post('/score',authorizer,tryCatch(async(req,res)=>{
	await scoreController.addScore(req,res);
}))

router.get('/score/:userid?',tryCatch(async(req,res)=>{
	await scoreController.getScore(req,res);
}))


module.exports = router

