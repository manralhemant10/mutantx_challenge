const router = require('express').Router()
const bodyParser = require('body-parser')
const scoreController = require('../controller/scoreController')
const tryCatch = require('../wrapper/tryCatch')
const authorizer = require('../middleware/authorizer')
const scoreHistRoute = require('./scoreHist.js')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());


router.post('/score',authorizer,tryCatch(async(req,res)=>{
	await scoreController.addScore(req,res);
}))

router.get('/score',tryCatch(async(req,res)=>{
	await scoreController.getScore(req,res);
}))

router.use('/score',scoreHistRoute)

module.exports = router

