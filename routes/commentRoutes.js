const router =  require('express').Router()
const { Comment, User, Post } = require('../models')
const passport = require('passport')

router.get('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.find({ post: req.params.id })
    .populate('author','username')
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

router.post('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    comment_date: Date.now(),
    author: req.user._id,
    post: req.params.id
  })
  .then(comment => {
    User.findByIdAndUpdate(req.user._id, { $push: { comments: comment._id } })
      .then(() => {
        Post.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } })
          .then(() => {
            res.json({
              comment_text: comment.comment_text,
              comment_date: comment.comment_date,
              post: comment.post,
              _id: comment._id,
              author: {
                username: req.user.username
              }
            })
          })
          .catch(err => console.log(err))
      })
      .catch (err => console.log(err))
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