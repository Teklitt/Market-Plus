// Import necessary modules
const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

// Define the route to handle updating cart quantity
router.put('/cart/update', async (req, res) => {
  try {
    // Extract productId and quantity from request body
    const { productId, quantity } = req.body

    // Update the quantity in the database
    const result = await connection.query(
      'UPDATE cart_items SET quantity = ? WHERE product_id = ?',
      [quantity, productId]
    )

    // Check if the update was successful
    if (result.affectedRows === 1) {
      res.status(200).json({ message: 'Cart quantity updated successfully' })
    } else {
      res.status(404).json({ error: 'Product not found in the cart' })
    }
  } catch (error) {
    console.error('Error updating cart quantity:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Export the router
module.exports = router
