const router = require('express').Router()
const { Post, User } = require('../models')
const passport = require('passport')

router.get('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.find({})
    .populate('author')
    .populate('likes')
    .populate('comments')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.get('/posts/user/:id', passport.authenticate('jwt'), (req, res) => {
  Post.find({ author: req.params.id })
    .populate('author')
    .populate('likes')
    .populate('comments')
    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

router.post('/posts', passport.authenticate('jwt'), (req, res) => {
  Post.create({
    post_content: req.body.post_content,
    author: req.user._id,
    post_image: req.body.post_image,
    post_imageName: req.body.post_imageName,
    post_date: Date.now()
  })
    .then(post => {
      User.findByIdAndUpdate(req.user._id, { $push: { posts: post._id } })
        .then(() => {
          let outputPost = {
            _id: post._id,
            post_content: post.post_content,
            post_date: post.post_date,
            likes: post.likes,
            comments: post.comments,  
            author: req.user
          }
          res.json(outputPost)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.put('/posts/likes/:id', passport.authenticate('jwt'), (req, res) => {
  Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => console.log(err))
})

// router.get('/posts/likes/:id', passport.authenticate('jwt'), (req, res) => {
//   Post.find({})
//     .populate('likes')
//     .then((likes) => res.json(likes))
//     .catch((err) => console.log(err))
// })

module.exports = router
