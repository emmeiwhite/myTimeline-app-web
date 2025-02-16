import { createContext, useState, useContext } from 'react'

const initialUsers = [
  { id: 'user-a', name: 'Alice', avatar: 'https://via.placeholder.com/50' },
  { id: 'user-b', name: 'Bob', avatar: 'https://via.placeholder.com/50' },
  { id: 'user-c', name: 'Charlie', avatar: 'https://via.placeholder.com/50' }
]
// Create the context
const AppContext = createContext()

// Context provider component
const AppProvider = ({ children }) => {
  const [users] = useState(initialUsers)

  const [currentUser, setCurrentUser] = useState(users[0]) // Default to Alice
  const [messages, setMessages] = useState([]) // Array to hold messages

  const contextValue = { users, currentUser, setCurrentUser, messages, setMessages }

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
const useAppContext = () => useContext(AppContext)

export { AppProvider, useAppContext }
