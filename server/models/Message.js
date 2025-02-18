const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  chatId: String,
  senderId: String,
  receiverId: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Message', messageSchema)
