const request = require('supertest')
const app = require('../src/app')
const User = require('../src/Models/user');
const Task = require('../src/Models/task')
const { userOneID, userOne, setupDatabase } = require('./fixtures/db')


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