const express = require('express')
const server = express()

// Let's demonstrate middleware

server.get('/', (req, res) => {
  res.send('<h1>Home page</h1>')
})

server.get('/about', (req, res) => {
  res.send('<h1>About page</h1>')
})

server.listen(5000, () => {
  console.log('server running at port 5000')
})
