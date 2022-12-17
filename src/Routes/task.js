const express = require('express')
const auth = require('../middleware/auth')
const { deleteOne } = require('../Models/task')
const Task = require('../Models/task')

const router = express.Router()
router.post('/', auth, async (req, res) => {

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isUpdatesValid = updates.every(update => allowedUpdates.includes(update))


    if (!isUpdatesValid) {
        return res.status(400).send({ error: 'Invalid update' })
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send('User not found')
        }
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.send(404).send('User not found')
        }

        res.send(task)

    } catch (err) {
        return res.send(err)
    }
})

module.exports = router