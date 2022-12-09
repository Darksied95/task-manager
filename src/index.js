const express = require('express')
require('./db/mongoose')
const taskRouter = require('./Routes/task')
const userRouter = require('./Routes/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/tasks', taskRouter)
app.use('/users', userRouter)

const bcrypt = require('bcryptjs')




app.listen(port, () => {
    console.log('Server is up on port ' + port)
})