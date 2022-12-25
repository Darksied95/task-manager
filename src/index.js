const express = require('express')
require('./db/mongoose')
const taskRouter = require('./Routes/task')
const userRouter = require('./Routes/user')
const mailgun = require('mailgun-js')


const domain = 'sandboxa1a0e5fac6c346e8b25c0f38d403b8c8.mailgun.org';
const apiKey = '5e9ccfeeba14e3b88c68374d81aada97-eb38c18d-e7279a40'
const mg = mailgun({ apiKey, domain })


const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomeness!'
};

mg.messages().send(data, (err, body) => {
    console.log(body);
})
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