import ChatWindow from './components/ChatWindow'
import Sidebar from './components/Sidebar'

import { useEffect } from 'react'
import streamClient, { connectUser } from './streamClient'
import axios from 'axios'
import { useAppContext } from './context/MessagesContext'

console.log('Stream Client:', streamClient)

function App() {
  const { loggedInUser } = useAppContext() // Getting our default login user from the context

  useEffect(() => {
    const fetchTokenAndConnect = async () => {
      if (!loggedInUser?._id) return // Don't proceed if there's no logged-in user
      try {
        const response = await axios.get(`/api/users/token/${loggedInUser}`)
        const { token } = response.data
        await connectUser(loggedInUser._id, token)
      } catch (error) {
        console.error('Error fetching token:', error)
      }
    }

    fetchTokenAndConnect()

    return () => {
      streamClient.disconnectUser() // Cleanup on unmount
    }
  }, [])

  return (
    <section className="container mx-auto px-4 h-screen flex font-inter">
      <Sidebar />
      <ChatWindow />
    </section>
  )
}

export default App
