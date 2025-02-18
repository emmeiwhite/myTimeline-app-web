const express = require('express')
const router = express.Router()
const User = require('../models/User')

const StreamChat = require('stream-chat').StreamChat

// Initialize GetStream.io client
const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_SECRET)

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Generate a token for a user | which is required for authentication in GetStream.io.
/** We need to generate a token for each user when they join or log in. This token is needed for:
✅ Authenticating users in GetStream.io.
✅ Allowing users to send/receive real-time messages. */
router.get('/token/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    // Generate a token using GetStream.io SDK
    const token = streamClient.createToken(userId)

    res.json({ userId, token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
