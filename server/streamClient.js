require('dotenv').config()
const { StreamChat } = require('stream-chat')

console.log('STREAM_API_KEY:', process.env.STREAM_API_KEY)
console.log('STREAM_SECRET:', process.env.STREAM_SECRET)

const streamClient = StreamChat.getInstance(process.env.STREAM_API_KEY, process.env.STREAM_SECRET)

module.exports = streamClient
