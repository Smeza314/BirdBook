const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find({})
    .populate('author')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    post_title: req.body.post_title,
    post_content: req.body.post_content,
    author: req.user._id
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          res.json({
            id: post._id,
            post_title: post.post_title,
            post_content: post.post_content,
            author: req.user
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

module.exports = router
