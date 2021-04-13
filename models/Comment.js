const { model, Schema } = require('mongoose')

const Comment = new Schema({
  text: String,
  date: Date,
  
})

module.exports = model('Comment', Comment)