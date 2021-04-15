const { model, Schema } = require('mongoose')

const Comment = new Schema({
  comment_text: String,
  comment_date: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = model('Comment', Comment)