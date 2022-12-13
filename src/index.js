const express = require('express')
require('./db/mongoose')
const taskRouter = require('./Routes/task')
const userRouter = require('./Routes/user')

const app = express()
const port = process.env.PORT || 3000


// app.use((req, res, next) => {
//     res.status(501).send('Maintainace mode activated')
// })
app.use(express.json())
app.use('/tasks', taskRouter)
app.use('/users', userRouter)





app.listen(port, () => {
    console.log('Server is up on port ' + port)
})