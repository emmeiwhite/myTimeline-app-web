const express = require('express')
const dotenv = require('dotenv')

const products = require('./data')

dotenv.config()

const app = express()

// Middleware
app.use(express.json()) // Parses incoming JSON requests

app.get('/', (req, res) => {
  // res.send('Chat App Backend is Running...')
  res.json(products)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
