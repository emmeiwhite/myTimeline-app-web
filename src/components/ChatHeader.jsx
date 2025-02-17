import { useAppContext } from '../context/MessagesContext'

const ChatHeader = () => {
  const { currentUser } = useAppContext()
  return (
    <section className="h-16 bg-blue-200   p-4 flex items-center">
      <img
        src={currentUser?.avatar || 'https://avatar.iran.liara.run/public/22'}
        alt={`${currentUser?.name}'s avatar`}
        className="w-10 h-10 rounded-full"
      />
      <p className="text-lg font-semibold ml-4">{currentUser?.name || 'Select a User'}</p>
    </section>
  )
}
export default ChatHeader
