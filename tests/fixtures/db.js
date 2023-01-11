const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/Models/user')
const Task = require('../../src/Models/task')

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
const userTwoID = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoID,
    name: 'Rajah',
    email: 'Ali2@gmail.com',
    password: '56po!!!!!!!!!',
    tokens: [{
        token: jwt.sign({ _id: userTwoID }, process.env.jwtSignature)
    }]
}
const taskOne = {
    _id: new mongoose.Types.ObjectId,
    description: 'Task One',
    completed: true,
    owner: userOneID
}
const taskTwo = {
    _id: new mongoose.Types.ObjectId,
    description: 'Task Two',
    completed: false,
    owner: userOneID
}
const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Task Three',
    completed: true,
    owner: userTwoID
}

async function setupDatabase() {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneID,
    userOne,
    userTwo,
    userTwoID,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}