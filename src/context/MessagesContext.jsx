import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
// Our Users of one-to-one app
const initialUsers = [
  { id: 'user-a', name: 'Emmei', avatar: 'https://avatar.iran.liara.run/public/43' },
  { id: 'user-b', name: 'Adi', avatar: 'https://avatar.iran.liara.run/public/41' }
]

// Let's add dummy messages for Adi & Emmei
/*
const initialMessages = {
  'user-a_user-b': [
    { sender: 'user-a', content: 'Hi there!', timestamp: '2025-02-17T14:00:00Z' },
    { sender: 'user-b', content: 'Hello, how are you?', timestamp: '2025-02-17T14:05:00Z' }
  ]
}
*/
/** A Change in initialMessages logic. We'll group each message with a senderId & a receiverId with a common chatId b/w two users. This approach seems more easy to implement and in querying from the BE as well  */

// Assuming we are making an API call to get messages between two individuals having a common chatId : GET /messages/:chatId (We'll need to make an API call for this) & Assume we receive the below formatted data (Obviously BE will do the querying of DB & getting data in this format for us)

const initialMessages = [
  {
    id: 'msg1',
    chatId: 'user-a_user-b',
    senderId: 'user-a',
    receiverId: 'user-b',
    content: 'Hi there!',
    timestamp: '2025-02-17T14:00:00Z'
  },
  {
    id: 'msg2',
    chatId: 'user-a_user-b',
    senderId: 'user-b',
    receiverId: 'user-a',
    content: 'Hello, how are you?',
    timestamp: '2025-02-17T14:05:00Z'
  }
]

// const initialMessages = {} //For testing purpose
// Create Context
const AppContext = createContext()

// Context provider component
const AppProvider = ({ children }) => {
  //  Let's fetch the real time data:

  /* // ALL THE MOCK DATA FOR FE TO BE REPLACED BY BE REAL TIME DATA WITH APIS
  const [users, setUsers] = useState([initialUsers])

  const [loggedInUser, setLoggedInUser] = useState({
    id: 'user-a',
    name: 'Emmei',
    avatar: 'https://avatar.iran.liara.run/public/43'
  })

  const [currentUser, setCurrentUser] = useState(null) // Initially no chat-partner would be selected
  const [messages, setMessages] = useState(initialMessages) // Array to hold messages
*/

  const [users, setUsers] = useState([])

  const [loggedInUser, setLoggedInUser] = useState({
    _id: 'user-a',
    name: 'Emmei',
    avatar: 'https://avatar.iran.liara.run/public/43'
  })

  const [currentUser, setCurrentUser] = useState(null) // Initially no chat-partner would be selected
  const [messages, setMessages] = useState() // Array to hold messages

  // 1) We need to fetch the Users first (to join their ids to make chatId of two individuals)
  async function fetchUsers() {
    try {
      const response = await axios.get('/api/users')
      setUsers(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // 2) Fetch messages when currentUser changes

  async function fetchMessages() {
    let chatId = [loggedInUser._id, currentUser._id].sort().join('_')
    console.log('ChatId is:')
    console.log(chatId)
    // Similar way chatId should be generated in the BE as well while adding messages (Will check in a while)
    try {
      const response = await axios.get(`/api/messages/${chatId}`)
      setMessages(response.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if (!currentUser) return // Don't fetch if no user is selected
    fetchMessages()
  }, [currentUser])

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
