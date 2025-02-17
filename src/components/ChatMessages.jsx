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
        <p className="text-gray-500 text-center">No messages yet. Say hi! 👋</p>
      ) : (
        <ul className="space-y-2">
          {chatMessages.map((msg, index) => {
            const isMe = msg.sender === loggedInUser.id
            return (
              <li
                key={index}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-2 max-w-xs rounded-lg ${
                    isMe ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}>
                  <strong>{isMe ? 'Me' : currentUser.name}:</strong> {msg.content}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default ChatMessages
