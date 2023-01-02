const app = require('../src/app')
const request = require('supertest')
const User = require('../src/Models/user')


const userOne = {
    name: 'Raj',
    email: 'Ali@gmail.com',
    password: '56po!!!!!!!!!!!!'
}

beforeEach(() => {
    User.deleteMany()
})



test('Should create User', async () => {
    await request(app)
        .post('/users')
        .send(userOne)
        .expect(201)

})