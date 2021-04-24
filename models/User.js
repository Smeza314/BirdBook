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
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  profileImage: {
    type: String,
    default: './images/birdBook2.png'
  }
})

// Add picture section to model. 

User.plugin(require('passport-local-mongoose'))

module.exports = model('User', User)