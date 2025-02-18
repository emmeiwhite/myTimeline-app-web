import { createContext, useState, useContext } from 'react'

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
    _id: 'msg1',
    chatId: 'user-a_user-b',
    senderId: 'user-a',
    receiverId: 'user-b',
    content: 'Hi there!',
    timestamp: '2025-02-17T14:00:00Z'
  },
  {
    _id: 'msg2',
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
  const [users, setUsers] = useState(initialUsers)

  const [loggedInUser, setLoggedInUser] = useState({
    id: 'user-a',
    name: 'Emmei',
    avatar: 'https://avatar.iran.liara.run/public/43'
  })

  const [currentUser, setCurrentUser] = useState(null) // Initially no chat-partner would be selected
  const [messages, setMessages] = useState(initialMessages) // Array to hold messages

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
