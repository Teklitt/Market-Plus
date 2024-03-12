const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') // Import body-parser module

const productsRouter = require('./endpoints/get-products')
const cartsRouter = require('./endpoints/get-cart-items')
const addtocartRouter = require('./endpoints/add-to-cart')
const updatecartRouter = require('./endpoints/update-cart-quantity')
const removecartRouter = require('./endpoints/remove-item-from-cart')
const emptycartRouter = require('./endpoints/empty-cart')
const checkoutRouter = require('./endpoints/checkout')

const app = express()
const port = 3001

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json())

// Enable CORS for all routes
app.use(cors())

app.use('/api', productsRouter)
app.use('/api', cartsRouter)
app.use('/api', addtocartRouter)
app.use('/api', updatecartRouter)
app.use('/api', removecartRouter)
app.use('/api', emptycartRouter)
app.use('/api', checkoutRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
