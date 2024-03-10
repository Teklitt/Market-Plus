const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

router.get('/cart', (req, res) => {
  const userId = req.query.userId // Assuming userId is passed as a query parameter
  //const sql = 'SELECT * FROM cart WHERE user_id = ?'
  const sql =
    'SELECT P.name, P.image, P.price, CI.quantity FROM cart_items AS CI INNER JOIN carts AS C ON C.id = CI.cart_id INNER JOIN product AS P ON CI.product_id = P.id WHERE C.user_id = 1;'
  connection.query(sql, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching cart:', error)
      res.status(500).json({ error: 'Internal server error' })
    } else {
      res.json(results)
    }
  })
})

module.exports = router
