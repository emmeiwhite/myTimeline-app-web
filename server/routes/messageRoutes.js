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
    const newMessage = new Message(req.body)
    const savedMessage = await newMessage.save()
    res.json(savedMessage)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
