const { model, Schema } = require('mongoose')

const User = new Schema({
  name: String,
  email: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
})

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)