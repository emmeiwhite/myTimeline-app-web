const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

// Middleware
app.use(express.json()) // Parses incoming JSON requests

app.get('/', (req, res) => {
  res.send('Chat App Backend is Running...')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
