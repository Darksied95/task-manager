const request = require('supertest')
const app = require('../src/app')
const User = require('../src/Models/user');
const { userOneID, userOne, setupDatabase } = require('./fixtures/db')



beforeEach(setupDatabase)

test('Should create User', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'Darksied',
            email: 'Darksied95@yahoo.com',
            password: '2-2-dimethyel'
        })
        .expect(201)

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

test('Should upload User Avatar', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('upload', 'tests/fixtures/image.jpg')
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user.avatar).toEqual(expect.any(Buffer))
})


test('Should update valid user field', async () => {
    await request(app)
        .patch('/users/me')
        .send({ "name": "Efe" })
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    const user = await User.findById(userOneID)
    expect(user.name).toBe('Efe')
})

test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({ location: 'HereOrThere' })
        .expect(400)

})