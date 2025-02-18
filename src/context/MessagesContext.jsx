import { createContext, useState, useContext } from 'react'

// Our Users of one-to-one app
const initialUsers = [
  { id: 'user-a', name: 'Emmei', avatar: 'https://avatar.iran.liara.run/public/43' },
  { id: 'user-b', name: 'Adi', avatar: 'https://avatar.iran.liara.run/public/41' }
]

// Let's add dummy messages for Adi & Emmei
// const initialMessages = {
//   'user-a_user-b': [
//     { sender: 'user-a', content: 'Hi there!', timestamp: '2025-02-17T14:00:00Z' },
//     { sender: 'user-b', content: 'Hello, how are you?', timestamp: '2025-02-17T14:05:00Z' }
//   ]
// }

const initialMessages = {} //For testing purpose
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
