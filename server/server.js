const express = require('express')
const server = express()

// Let's demonstrate middleware
const logger = (req, res, next) => {
  const method = req.method
  const url = req.url
  const date = new Date().getFullYear()

  console.log(method, url, date) // logging
  //   res.send('Testing Middleware!')
  console.log('I am the logger middleware')
  next()
}

server.get('/', logger, (req, res) => {
  console.log('I am the home route')
  res.send('<h1>Home page</h1>')
})

server.get('/about', (req, res) => {
  res.send('<h1>About page</h1>')
})

server.listen(5000, () => {
  console.log('server running at port 5000')
})
