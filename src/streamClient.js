import { StreamChat } from 'stream-chat'

const apiKey = import.meta.env.VITE_STREAM_API_KEY
const streamClient = StreamChat.getInstance(apiKey)

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

// ✅ Adding this function to properly disconnect users
export const disconnectUser = async () => {
  try {
    await streamClient.disconnectUser()
    console.log('🔌 Disconnected from Stream')
  } catch (error) {
    console.error('❌ Error disconnecting from Stream:', error)
  }
}

export default streamClient
