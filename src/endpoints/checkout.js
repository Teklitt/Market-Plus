const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const util = require('util')

// Define the route to handle checkout
router.post('/checkout', async (req, res) => {
  console.log('Received checkout request')
  const { userId } = req.body
  const query = util.promisify(connection.query).bind(connection)
  try {
    // Begin a transaction
    await connection.beginTransaction()

    // Update inventory levels
    await connection.query(
      `
      UPDATE product AS P
      INNER JOIN cart_items AS CI ON P.id = CI.product_id
      SET P.inventory = P.inventory - CI.quantity
      WHERE CI.cart_id = ?
    `,
      [userId]
    )

    // Remove items from cart
    await connection.query('DELETE FROM cart_items WHERE cart_id = ?', [userId])

    // Commit the transaction
    await connection.commit()

    res.status(200).json({ message: 'Checkout successful' })
  } catch (error) {
    // If any error occurs, rollback the transaction
    await connection.rollback()

    console.error('Error during checkout:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
