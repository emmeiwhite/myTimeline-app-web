import { useAppContext } from '../context/MessagesContext'

const ChatHeader = () => {
  const { currentUser, loggedInUser } = useAppContext()
  return (
    <section className="h-16 bg-blue-200   p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={currentUser?.avatar || 'https://avatar.iran.liara.run/public/22'}
          alt={`${currentUser?.name}'s avatar`}
          className="w-10 h-10 rounded-full"
        />
        <p className="text-lg font-semibold ml-4">{currentUser?.name || 'Select a User'}</p>
      </div>
      <div className="flex ">
        <p className="text-gray-900 text-sm">logged: {loggedInUser?.name}</p>
        <img
          src={loggedInUser?.avatar || 'https://avatar.iran.liara.run/public/22'}
          alt={`${loggedInUser?.name}'s avatar`}
          className="w-5 h-5 rounded-full"
        />
      </div>
    </section>
  )
}
export default ChatHeader
