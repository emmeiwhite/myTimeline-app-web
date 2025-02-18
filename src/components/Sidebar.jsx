import { useAppContext } from '../context/MessagesContext'
const Sidebar = () => {
  const { users, setCurrentUser, currentUser } = useAppContext()
  console.log(users)

  return (
    <div className="p-4 w-1/4 bg-blue-300">
      <h2 className="text-xl font-medium mb-4 ">One-on-One Chat 💬</h2>
      <ul>
        {users?.map(user => (
          <li
            key={user?.id}
            className={`flex items-center p-2 cursor-pointer hover:bg-blue-400 rounded ${
              currentUser?.id === user?.id ? 'bg-blue-400' : ''
            }`}
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
