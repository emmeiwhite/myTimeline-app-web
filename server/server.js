require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const StreamChat = require('stream-chat').StreamChat

// Create Express app
const app = express()
app.use(express.json())
app.use(cors())

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Routes
app.use('/api/messages', require('./routes/messageRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
