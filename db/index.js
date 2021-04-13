module.exports = require('mongoose').connect(process.env.MONGODB_URI || 'mongodb://localhost/birdbook_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
