const express = require('express')
const app = express()
const {PORT} = require('./config/config.js')
const authRouter = require('./routes/authentication.js')
const scoreRouter = require('./routes/score.js')
const scoreHistRoute = require('./routes/scoreHist.js')
const erroHandler = require('./middleware/errorHandler')


app.use('/auth',authRouter)
app.use('/game',scoreRouter)
app.use('/game',scoreHistRoute)

app.use(erroHandler)

app.get('/',(req,res)=>res.send("sample working"))
app.listen(PORT,()=>{
	console.log(`server started at ${PORT}`)
})

