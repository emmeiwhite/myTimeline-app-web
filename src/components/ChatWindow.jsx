import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatMessages from './ChatMessages'

const ChatWindow = () => {
  return (
    <section className="flex-1 flex flex-col h-full">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </section>
  )
}
export default ChatWindow
