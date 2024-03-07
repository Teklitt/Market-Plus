const express = require('express')
const cors = require('cors')
const productsRouter = require('./endpoints/products')

const app = express()
const port = 3001

// Enable CORS for all routes
app.use(cors())

app.use('/api', productsRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
