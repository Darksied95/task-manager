const express = require('express')
require('./db/mongoose')
const taskRouter = require('./Routes/task')
const userRouter = require('./Routes/user')


const app = express()

app.use(express.json())
app.use('/tasks', taskRouter)
app.use('/users', userRouter)




module.exports = app