require('dotenv').config()
const { StreamChat } = require('stream-chat')

const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_SECRET)

module.exports = streamClient
