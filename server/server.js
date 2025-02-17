const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Test Route
app.get('/', (req, res) => {
  res.send('Backend server is running!')
})

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
