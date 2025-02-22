const express = require('express')
const server = express()

const logger = require('./logger')
const authenticate = require('./authenticate')

server.use([logger, authenticate])

server.get('/', (req, res) => {
  console.log('I am the home route')
  res.send('<h1>Home page</h1>')
})

server.get('/about', (req, res) => {
  console.log('About page')
  res.send('<h1>About page</h1>')
})

server.get('/api/cities', (req, res) => {
  console.log('Cities')
  res.send('<h1>Cities page</h1>')
})

server.get('/api/products', (req, res) => {
  console.log('Products')
  console.log(req.user) // Modified by the authenticate middleware. We are getting the user info
  res.send('<h1>Products page</h1>')
})

server.listen(5000, () => {
  console.log('server running at port 5000')
})
