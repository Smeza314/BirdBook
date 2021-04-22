const { model, Schema } = require('mongoose')

const Post = new Schema({
  post_content: String, 
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  post_date: Date,
  
  post_image: String
})

module.exports = model('Post', Post)