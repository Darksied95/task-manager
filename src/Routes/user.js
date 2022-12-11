const express = require('express')

const router = express.Router()
const User = require('../Models/user')


router.get('/', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(404).send('Wrong email or password, try again.')
    }
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']

    const isUpdatesValid = updates.every(update => allowedUpdates.includes(update))
    if (!isUpdatesValid) {
        return res.status(400).send({ error: 'Invalid update' })
    }
    try {

        const user = await User.findById(req.params.id)
        updates.forEach(update => user[update] = req.body[update])
        await user.save()

        if (!user) {
            return res.status(404).send('User not found')
        }

        res.send(user)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.send(404).send('User not found')
        }
        res.send(user)
    } catch (err) {
        return res.send(err)
    }
})

module.exports = router