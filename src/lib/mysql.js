const mysql = require('mysql')

const connection = mysql.createConnection({
  host: '34.136.109.33',
  user: 'everyone',
  password: 'morgan-group2400$$',
  database: 'bear_market',
})

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack)
    return
  }
  console.log('Connected to MySQL as id ' + connection.threadId)
})

module.exports = connection

// const express = require('express')
// const mysql = require('mysql')

// const app = express()
// const port = 3001

// const connection = mysql.createConnection({
//   host: '34.136.109.33',
//   user: 'everyone',
//   password: 'morgan-group2400$$',
//   database: 'bear_market',
// })

// app.get('/api/product', (req, res) => {
//   connection.query('SELECT * FROM product', (error, results) => {
//     if (error) {
//       console.error('Error fetching products:', error)
//       res.status(500).json({ error: 'Internal server error' })
//     } else {
//       res.json(results)
//     }
//   })
// })

// app.get('/api/product/{product_id}', (req, res) => {
//   connection.query(
//     'SELECT * FROM product WHERE id = product_id',
//     (error, results) => {
//       if (error) {
//         console.error('Error fetching products:', error)
//         res.status(500).json({ error: 'Internal server error' })
//       } else {
//         res.json(results)
//       }
//     }
//   )
// })

// app.get('/api/cart', (req, res) => {
//   connection.query('SELECT * FROM cart', (error, results) => {
//     if (error) {
//       console.error('Error fetching cart:', error)
//       res.status(500).json({ error: 'Internal server error' })
//     } else {
//       res.json(results)
//     }
//   })
// })

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`)
// })
