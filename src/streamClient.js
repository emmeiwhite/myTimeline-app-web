import { StreamChat } from 'stream-chat'

const apiKey = import.meta.env.VITE_STREAM_API_KEY
const streamClient = StreamChat.getInstance(apiKey)

console.log(`API KEY IS ${apiKey}`)
export const connectUser = async (userId, token) => {
  try {
    await streamClient.connectUser(
      { id: userId, name: userId }, // You can add more user info here
      token
    )
    console.log(`✅ Connected to Stream as ${userId}`)
  } catch (error) {
    console.error('❌ Error connecting to Stream:', error)
  }
}

export default streamClient
