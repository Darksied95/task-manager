const express = require('express')
const Task = require('../Models/task')

const router = express.Router()
router.post('/', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isUpdatesValid = updates.every(update => allowedUpdates.includes(update))


    if (!isUpdatesValid) {
        return res.status(400).send({ error: 'Invalid update' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!task) {
            return res.status(404).send('User not found')
        }

        res.send(task)
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])

        await task.save()
        if (!task) {
            return res.send(404).send('User not found')
        }
        res.send(task)
    } catch (err) {
        return res.send(err)
    }
})

module.exports = router