import ChatWindow from './components/ChatWindow'
import Sidebar from './components/Sidebar'
import { AppProvider } from './context/MessagesContext'

function App() {
  return (
    <AppProvider>
      <section className="container mx-auto px-4 h-screen flex font-inter">
        <Sidebar />
        <ChatWindow />
      </section>
    </AppProvider>
  )
}

export default App
