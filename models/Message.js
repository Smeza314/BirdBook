const { model, Schema } = require('mongoose')

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
    text_content: String,
    date: Date,
    author: { 
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
  
})

module.exports = model('Message', Message)