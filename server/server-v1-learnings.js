const express = require('express')
const dotenv = require('dotenv')

const products = require('./data')

dotenv.config()

const app = express()

// Middleware
app.use(express.json()) // Parses incoming JSON requests

app.get('/', (req, res) => {
  // res.send('Chat App Backend is Running...')
  // res.json(products)
  res.send(`<h1>Home Page <a href="/api/products">Products<a/></h1>`)
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
  const productsMin = products.map(product => ({
    id: product.id,
    name: product.name,
    price: product.price
  }))

  res.json(productsMin)
})

// Sending back a single product
app.get('/api/products/:productId', (req, res) => {
  const { productId } = req.params
  const singleProduct = products.find(product => product.id === Number(productId))

  if (!singleProduct) {
    return res.send('<h1>ERROR 404: Product does not exist</h1>')
  }
  res.json(singleProduct)
})

// Complicated example for Route Parameters
app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
  const { productId, reviewId } = req.params

  res.send(`<p>ProductId: ${productId} & ReviewId: ${reviewId}<p/>`)
})

// Setting up a route to handle query parameter
app.get('/api/v1/query', (req, res) => {
  const { search, limit } = req.query

  console.log(req.query)
  // We'll work with the copy of the original products
  let filteredProducts = [...products]

  if (search) {
    filteredProducts = filteredProducts.filter(product => {
      return product.name.startsWith(search)
    })
  }

  if (limit) {
    filteredProducts = filteredProducts.slice(0, Number(limit))
  }

  if (filteredProducts.length === 0) {
    // return res.status(200).send('<h1>no products match your search</h1>')
    return res.status(200).json({ status: true, data: [] })
  }

  res.status(200).json(filteredProducts)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
