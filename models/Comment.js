const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: String
})

module.exports = model('Comment', Comment)