const { model, Schema } = require('mongoose')

const Post = new Schema({
  post_title: String,
  post_content: String, 
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  post_date: Date
})

module.exports = model('Post', Post)