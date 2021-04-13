const { SchemaTypes } = require("mongoose")

const { model, Schema } require('mongoose')

const Message = new Schema ({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
   receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  messages: [{
    textcontent: String,
    message_date: Date,
    author: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
  
})

module.exports = model('Message', Message)