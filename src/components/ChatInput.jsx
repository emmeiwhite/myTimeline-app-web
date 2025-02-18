import { useState } from 'react'
import { useAppContext } from '../context/MessagesContext'

const ChatInput = () => {
  const [message, setMessage] = useState('')

  const { currentUser, messages, setMessages, loggedInUser } = useAppContext() // Context data

  function handleSubmit(e) {
    e.preventDefault()
    // The task is to add the currentUser message onto the messages object
    if (message.trim() === '') return

    const chatKey = [loggedInUser._id, currentUser._id].sort().join('_')
    // We are using sort to  ensure consistency in the message storage key, regardless of who is the sender or receiver.

    const chatMessages = messages[chatKey] || [] // Bringing the chatMessages of current two users, loggedInUser(Immi) and currentUser (Adi)

    // const newMessage = {
    //   sender: loggedInUser.id,
    //   content: message,
    //   timestamp: new Date().toISOString()
    // }

    const newMessage = {
      id: 'msgXYZ',
      chatId: chatKey,
      senderId: loggedInUser._id,
      receiverId: currentUser._id,
      content: message,
      timestamp: new Date().toISOString()
    }

    // const updateCurrentChatMessages = [...chatMessages, newMessage]

    // setMessages(prevMessages => {
    //   return {
    //     ...prevMessages,
    //     [chatKey]: updateCurrentChatMessages
    //   }
    // })

    setMessages([...messages, newMessage])

    setMessage('')
  }
  return (
    <form
      className="h-24 bg-blue-200 border-t border-gray-300 p-4 flex items-center gap-4"
      onSubmit={handleSubmit}>
      {/* Input Field */}
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      {/* Submit Button */}
      <button
        type="submit"
        className="h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
        Send
      </button>
    </form>
  )
}

export default ChatInput
