const jwt = require('jsonwebtoken')
const User = require('../Models/user')


async function auth(req, res, next) {

    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.decode(token, 'Helloworld')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            console.log('Something went wrong');
            throw new Error()
        }
        req.user = user
        next()
    } catch (error) {
        res.status(401).send({ error: 'Please Authenticate' })
    }
}


module.exports = auth