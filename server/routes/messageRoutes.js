const express = require('express')
const router = express.Router()
const Message = require('../models/Message')
const streamClient = require('../streamClient') // Import GetStream client

// Get all messages
router.get('/:chatId', async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Send a message
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body

    // Ensure chatId is always correctly formatted

    const chatId = [senderId, receiverId].sort().join('_')

    // 1. Saving message to MongoDB
    const newMessage = new Message({
      chatId,
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString()
    })
    const savedMessage = await newMessage.save()

    // 2️. Send message to GetStream
    const channel = streamClient.channel('messaging', chatId, {
      created_by_id: senderId // Required for server-side auth
    })

    await channel.watch() // ✅ Ensures the channel exists or creates it

    // ✅ Log response from GetStream
    const sendMessageResponse = await channel.sendMessage({
      text: content, // ✅ Use the actual message content
      user_id: senderId // ✅ Use senderId instead of loggedInUserId
    })

    console.log('Message sent response:', sendMessageResponse)

    res.json(savedMessage)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
