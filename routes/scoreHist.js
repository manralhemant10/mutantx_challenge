const router = require('express').Router()
const bodyParser = require('body-parser')
const scoreHistController = require('../controller/scoreHistController')
const tryCatch = require('../wrapper/tryCatch')


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json());


router.get('/scorehist',tryCatch(async(req,res)=>{
	await scoreHistController.getScore(req,res);
}))


module.exports = router

