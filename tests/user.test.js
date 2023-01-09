const mongoose = require('mongoose')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const User = require('../src/Models/user')


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


beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save()
})



test('Should create User', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Darksied',
            email: 'Darksied95@yahoo.com',
            password: '2-2-dimethyel'
        })
        .expect(201)

    // to be sure it register in the database
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: 'Darksied',
            email: 'darksied95@yahoo.com'
        },
        token: user.tokens[0].token
    })
    expect(response.body.user.password).not.toBe('2-2-dimethyel')

})

test('should log a user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200)
})
test('should not log in a non-existent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'áji',
            password: 'userOne.password'
        })
        .expect(404)
})


test('should return profile of authenticated user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})


test('should not return profile of unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .expect(401)
})


test('Should delete authenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})

test('Should not delete unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .expect(401)
})
