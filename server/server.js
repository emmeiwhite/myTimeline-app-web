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

  // res.send(`<h1>Home Page <a href="/api/products">Products<a/></h1>`)
})

/* --- 
{
"id": 1,
"name": "Laptop",
"price": 999.99,
"description": "A high-performance laptop for work and play.",
"category": "Electronics",
"inStock": true
},
--- */
app.get('/api/products', (req, res) => {
  products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.
  }))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
