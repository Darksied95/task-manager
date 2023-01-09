const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/Models/user')

const userOneID = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneID,
    name: 'Raj',
    email: 'Ali@gmail.com',
    password: '56po!!!!!!!!!!!!',
    tokens: [{
        token: jwt.sign({ _id: userOneID }, process.env.jwtSignature)
    }]
}

async function setupDatabase() {
    await User.deleteMany();
    await new User(userOne).save()
}

module.exports = {
    userOneID,
    userOne,
    setupDatabase
}