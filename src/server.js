const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser') // Import body-parser module
const productsRouter = require('./endpoints/products')
const cartsRouter = require('./endpoints/carts')
const addtocartRouter = require('./endpoints/add-to-cart')

const app = express()
const port = 3001

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json())

// Enable CORS for all routes
app.use(cors())

app.use('/api', productsRouter)
app.use('/api', cartsRouter)
app.use('/api', addtocartRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
