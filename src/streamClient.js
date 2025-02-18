import { StreamChat } from 'stream-chat'

const apiKey = import.meta.env.VITE_STREAM_API_KEY // Store in .env file
const streamClient = StreamChat.getInstance(apiKey)

export default streamClient
