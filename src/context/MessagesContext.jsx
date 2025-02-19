import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import streamClient, { connectUser } from '../streamClient'

// Create Context
const AppContext = createContext()

// Context provider component
const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [currentUser, setCurrentUser] = useState(null) // Initially no chat partner selected
  const [isStreamConnected, setIsStreamConnected] = useState(false)

  // Test users (No auth, switch between them manually)
  const [loggedInUser, setLoggedInUser] = useState({
    _id: 'user-a',
    name: 'Emmei',
    avatar: 'https://avatar.iran.liara.run/public/43'
  })

  /* ---
  const [loggedInUser, setLoggedInUser] = useState({
    _id: 'user-b',
    name: 'Adi',
    avatar: 'https://avatar.iran.liara.run/public/41'
  })
  --- */

  // 1) Fetch Users
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('/api/users')
        setUsers(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }
    fetchUsers()
  }, [])

  // 2) Connect to Stream Chat API (Ensuring connection before using `channel`)
  useEffect(() => {
    if (!loggedInUser) return

    const connectToStream = async () => {
      try {
        const tokenResponse = await axios.get(`/api/users/token/${loggedInUser._id}`)
        const token = tokenResponse.data.token

        await connectUser(loggedInUser._id, token)
        setIsStreamConnected(true) // Mark Stream connection as established
      } catch (error) {
        console.error('❌ Stream connection error:', error)
      }
    }

    connectToStream()

    return () => {
      streamClient.disconnectUser() // Cleanup on unmount
    }
  }, [loggedInUser])

  // 3) Fetch messages when `currentUser` changes
  useEffect(() => {
    async function fetchMessages() {
      if (!currentUser) return
      let chatId = [loggedInUser._id, currentUser._id].sort().join('_')

      console.log('ChatId is:', chatId)

      try {
        const response = await axios.get(`/api/messages/${chatId}`)
        setMessages(response.data)
      } catch (error) {
        console.log(error.response)
      }
    }

    fetchMessages()
  }, [currentUser])

  // 4) Real-time message listener (Only if Stream is connected)
  useEffect(() => {
    if (!isStreamConnected || !currentUser) return

    const chatId = [loggedInUser._id, currentUser._id].sort().join('_')
    console.log(`🔗 Subscribing to GetStream channel: ${chatId}`)

    const handleNewMessage = event => {
      console.log('📩 New message received:', event.message)
      setMessages(prevMessages => [...prevMessages, event.message])
    }

    const setupChannel = async () => {
      try {
        if (!streamClient || !loggedInUser || !currentUser) return

        // 🛑 Prevent self-chat
        if (loggedInUser._id === currentUser._id) {
          console.error('You cannot create a chat with yourself.')
          return
        }

        const chatId = [loggedInUser._id, currentUser._id].sort().join('_')
        console.log(`🔗 Subscribing to GetStream channel: ${chatId}`)

        const channel = streamClient.channel('messaging', chatId, {
          members: [loggedInUser._id, currentUser._id]
        })

        await channel.watch() // Ensure channel is initialized
        channel.on('message.new', handleNewMessage)

        console.log(`✅ Listening for messages on channel: ${chatId}`)
      } catch (error) {
        console.error('❌ Error setting up channel:', error)
      }
    }

    setupChannel()

    return () => {
      streamClient.off('message.new', handleNewMessage) // Cleanup listener on unmount
    }
  }, [isStreamConnected, currentUser])

  // Context value
  const contextValue = {
    users,
    currentUser,
    setCurrentUser,
    messages,
    setMessages,
    loggedInUser,
    setLoggedInUser
  }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
