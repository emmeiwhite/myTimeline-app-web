const express = require('express')
const router = express.Router()
const Message = require('../models/Message')

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

    // Ensure chatId is always correctly formatted | Until now we were relying on chatId (of user1[loggedInUser] & user2[currentUser] )generated from the FE. Now we are adding the correct chatId to the backend as well.

    const chatId = [senderId, receiverId].sort().join('_')

    const newMessage = new Message({
      chatId,
      senderId,
      receiverId,
      content,
      timestamp: new Date().toISOString()
    })
    // const newMessage = new Message(req.body)
    const savedMessage = await newMessage.save()
    res.json(savedMessage)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
