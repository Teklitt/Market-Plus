const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const util = require('util')

router.post('/empty-cart', async (req, res) => {
  const { userId } = req.body
  const query = util.promisify(connection.query).bind(connection)

  try {
    // Start transaction
    await connection.beginTransaction()

    // Delete the item from the cart
    await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [userId])

    // Update the cart's updated_at timestamp
    await connection.query(
      'UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [userId]
    )

    // Commit the transaction
    await connection.commit()
    const cart = await query(
      'SELECT P.name, P.image, P.price, CI.quantity, CI.product_id FROM cart_items AS CI INNER JOIN carts AS C ON C.id = CI.cart_id INNER JOIN product AS P ON CI.product_id = P.id WHERE C.user_id = ?;',
      [userId]
    )

    res.json(cart)
  } catch (error) {
    console.error('Error removing item from cart:', error)
    // Rollback the transaction in case of error
    await connection.rollback()
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
