// Import necessary modules
const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')

// POST endpoint to handle adding items to the cart
router.post('/add-to-cart', async (req, res) => {
  const { productId, quantity } = req.body

  // Check if productId and quantity are provided
  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ error: 'Product ID and quantity are required' })
  }

  try {
    // Check if the product exists in the database
    const [product] = await connection.query(
      'SELECT * FROM products WHERE id = ?',
      [productId]
    )

    if (!product) {
      return res.status(404).json({ error: 'Product out of stock' })
    }

    // Add the product to the cart in the database
    await connection.query(
      'INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)',
      [productId, quantity]
    )

    // Fetch updated cart items
    const [cartItems] = await connection.query(
      'SELECT * FROM cart_items WHERE product_id = ?',
      [productId]
    )

    // Return the updated cart items
    res.json(cartItems)
  } catch (error) {
    console.error('Error adding item to cart:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Export the router
module.exports = router
