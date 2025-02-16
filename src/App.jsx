import Sidebar from './components/Sidebar'
import { AppProvider } from './context/MessagesContext'

function App() {
  return (
    <AppProvider>
      <section className="container mx-auto px-4 font-inter">
        <Sidebar />
      </section>
    </AppProvider>
  )
}

export default App
