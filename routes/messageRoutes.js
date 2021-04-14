const router = require('express').Router()
const { Message, User } = require('../models')

// GET route to receive every message 
router.get('/messages', passport.authenticate('jwt'), (req, res) => {
  Message.find({})
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

// POST route to create a message between two users
router.post('/messages/:id', passport.authenticate('jwt'), (req, res) => {
  Message.create({
    sender: req.user_id,
    receiver: req.params.id,
    messages: []
  })
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

router.delete('/messages/:id', passport.authenticate('jwt'), (req, res) => {
  Message.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// PUT route to content add to messages
router.put('/messages/:id', passport.authenticate('jwt'), (req, res) => {
  let newMessage = {
    text_content: req.body.text_content,
    date: Date.now(),
    author: req.user._id
  }
  Message.findByIdAndUpdate(req.params.id, { $push: { messages: newMessage } })
  .then(() => res.SendStatus(200))
  .catch(err=> console.log(err))
})

module.exports = router
