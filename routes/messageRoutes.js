const router = require('express').Router()
const { Message, User } = require('../models')
const passport = require('passport')

// GET route to receive every message 
router.get('/messages', passport.authenticate('jwt'), (req, res) => {
  Message.find({})
  .populate('receiver', 'username')
  .populate('sender', 'username')
  .populate('messages.author', 'username')
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

// GET route to receive all user's messages
router.get('/messages/user', passport.authenticate('jwt'), (req, res) => {
  Message.find({ $or: [
    {receiver: req.user._id},
    {sender: req.user._id}
  ]})
  .populate('receiver', 'username')
  .populate('sender', 'username')
  .populate('messages.author', 'username')
    .then(message => res.json(message))
    .catch(err => console.log(err))
})

// POST route to create a message between two users
router.post('/messages/:id', passport.authenticate('jwt'), (req, res) => {
  Message.create({
    sender: req.user._id,
    receiver: req.params.id,
    messages: []
  })
    .then(message => {
      User.findByIdAndUpdate(req.user._id, { $push: { messages: message._id } })
        .then(() => {
          User.findByIdAndUpdate(req.params.id, { $push: { messages: message._id } })
            .then(() => res.json(message))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

// DELETE route to delete the whole message conversation
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
<<<<<<< HEAD
  .then(() => res.SendStatus(200))
=======
  .then(() => res.sendStatus(200))
>>>>>>> 46a910515dbc01b18c0f5b9938e45bb5b361911e
  .catch(err=> console.log(err))
})

module.exports = router
