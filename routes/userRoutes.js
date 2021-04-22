const router = require('express').Router()
const { User } = require('../models')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// POST route that creates a new user through passport and creates a salt and hash for it
router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
}) 

// POST route that authenticate the user's login with their username and password and sends back a token if successful
router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    console.log(req.body)
    console.log(user)
    res.json(user ? jwt.sign({ id: user._id }, process.env.SECRET) : null)
  })
})

// GET route to grab the user and requires a token
router.get('/users', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user)
})

// GET route to grab all users
router.get('/users/all', passport.authenticate('jwt'), (req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => console.log(err))
  
})

// DELETE route to delete the currently signed in user
router.delete('/users', passport.authenticate('jwt'), (req, res) => {
  User.findByIdAndDelete(req.user._id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

// PUT route to add a user to the friend list 
router.put('/users/friend/:id', passport.authenticate('jwt'), (req,res) => {
  User.findByIdAndUpdate(req.user._id, { $push: {friends: req.params.id} })
    .then(() => {
      User.findByIdAndUpdate(req.params.id, { $push: { friends: req.user._id } })
        .then(() => res.sendStatus(200) )
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

})

// GET route to get user by ID
router.get('/users/:id', passport.authenticate('jwt'), (req, res) => {
  User.findById(req.params.id)
    .populate('posts')
    .populate('comments')
    .populate('messages')
    .populate('friends')
    .then((user) => res.json(user))
    .catch(err => console.log(err))

})

module.exports = router