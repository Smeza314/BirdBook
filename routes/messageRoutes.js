const router = require('express').Router()
const { Message } = require('../models')

router.get('/messages', (req, res) => {
  Message.find({})
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

router.post('/messages', (req, res) => {
  Message.create(req.body)
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

router.delete('/messages/:id', (req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.put('/messages/:id', (req, res) => {
  Message.findByIdAndUpdate(req.params.id, req.body)
  .then(() => res.SendStatus(200))
  .catch(err=> console.log(err))
})

module.exports = router