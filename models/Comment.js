const { model, Schema } = require('mongoose')

const Comment = new Schema({
  post_text: String,
  post_date: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'

})

module.exports = model('Comment', Comment)