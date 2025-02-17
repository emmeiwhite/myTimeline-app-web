import { useAppContext } from '../context/MessagesContext'

const ChatMessages = () => {
  const { messages, loggedInUser, currentUser } = useAppContext()

  if (!currentUser) {
    return (
      <section className="flex-1 flex items-center justify-center p-4 bg-green-50">
        <p className="text-gray-500">Select a user to start chatting</p>
      </section>
    )
  }

  const chatKey = [loggedInUser.id, currentUser.id].sort().join('_')
  const chatMessages = messages[chatKey] || []

  return (
    <section className="flex-1 overflow-y-auto p-4 bg-green-50">
      {chatMessages.length === 0 ? (
        <p className="text-gray-500">No messages yet. Say hi! 👋</p>
      ) : (
        <ul className="space-y-2">
          {chatMessages.map((msg, index) => (
            <li
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === loggedInUser.id ? 'bg-blue-200 self-end' : 'bg-gray-300 self-start'
              }`}>
              <strong>{msg.sender === loggedInUser.id ? 'Me' : currentUser.name}:</strong>{' '}
              {msg.content}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
export default ChatMessages
