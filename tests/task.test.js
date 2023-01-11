const request = require('supertest')
const app = require('../src/app')
const User = require('../src/Models/user');
const Task = require('../src/Models/task')
const {
    userOne,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase,
    userTwoID } = require('./fixtures/db')


beforeEach(setupDatabase)


test('Should create Task', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Check check'
        })
        .expect(201)
})

test('Should get task for userOne', async () => {
    await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})


test('Should not delte another user task', async () => {
    await request(app)
        .delete(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(200)
})