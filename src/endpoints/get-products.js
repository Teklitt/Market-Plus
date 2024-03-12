const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

router.get('/product', (req, res) => {
  connection.query('SELECT * FROM product', (error, results) => {
    if (error) {
      console.error('Error fetching products:', error)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(results)
    }
  })
})

module.exports = router
