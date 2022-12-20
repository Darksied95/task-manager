const express = require('express')
const multer = require('multer')
const auth = require('../middleware/auth')
const User = require('../Models/user')

const router = express.Router()
const upload = multer({
    limits: {
        fileSize: 1_000_000,
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            cb(new Error('Word document only'))
        }

        cb(undefined, true)
    }

})


router.get('/me', auth, async (req, res) => {
    res.send(req.user)
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

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isUpdatesValid = updates.every(update => allowedUpdates.includes(update))

    if (!isUpdatesValid) {
        return res.status(400).send({ error: 'Invalid update' })
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        //mongoose give us remove method 
        await req.user.remove()
        res.send(req.user)
    } catch (err) {
        return res.send(err)
    }
})

//Fourth parameter is used in cases where a middleware throws ann error 
router.post('/me/avatar', auth, upload.single('upload'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send('Uploaded successfully')
}, (err, req, res, next) => {
    res.status(400).send({ error: err.message })
})

router.delete('/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    console.log(req.user);
    await req.user.save()
    res.send(req.user)
})

module.exports = router