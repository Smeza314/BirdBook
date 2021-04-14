const router =  require('express').Router()
const { Comment, User, Post } = require('../models')
const passport = require('passport')

router.get('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.find({})
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    author: req.user_id
  })
  .then(comment => {
    User.findByIdAndUpdate(req.user._id, { $push: { comments: comment._id } })
      .then(()=> res.json(comment))
      .catch (err => console.log(err))
  })
  .then(comment => {
    Post.findByIdAndUpdate(req.post._id, { $push: { comments: comment._id } })
      .then(() => res.json(comment))
      .catch(err => console.log(err))
  })
    .catch(err => console.log(err))
})

router.put('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.findByIdAndUpdate (req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

router.delete('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
})

module.exports = router