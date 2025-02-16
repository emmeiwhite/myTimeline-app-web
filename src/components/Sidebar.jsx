import { useAppContext } from '../context/MessagesContext'
const Sidebar = () => {
  const { users, setCurrentUser } = useAppContext()

  return (
    <div className="p-4 w-64 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Chat one-on-one App</h2>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-400 rounded"
            onClick={() => setCurrentUser(user)}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full mr-3"
            />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
