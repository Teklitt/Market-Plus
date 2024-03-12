// Import necessary modules
const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const util = require('util')

// Define the route to handle updating cart quantity
router.put('/update-cart-quantity', async (req, res) => {
  try {
    // Extract productId and quantity from request body
    const { productId, quantity, userId } = req.body
    const query = util.promisify(connection.query).bind(connection)

    // Check if the quantity is zero, if so, remove the item from the cart
    if (quantity === 0) {
      await query(
        'DELETE FROM cart_items WHERE product_id = ? AND cart_id = ?',
        [productId, userId]
      )
      const cart = await query(
        'SELECT P.name, P.image, P.price, CI.quantity, CI.product_id FROM cart_items AS CI INNER JOIN carts AS C ON C.id = CI.cart_id INNER JOIN product AS P ON CI.product_id = P.id WHERE C.user_id = ?;',
        [userId]
      )
      res.json(cart) // Send the updated cart data as a response
      return // Exit the function to prevent executing the update query
    }

    // Update the quantity in the database
    const result = await query(
      'UPDATE cart_items SET quantity = ? WHERE product_id = ? AND cart_id = ?',
      [quantity, productId, userId]
    )

    // Check if the update was successful
    if (result.affectedRows === 1) {
      const cart = await query(
        'SELECT P.name, P.image, P.price, CI.quantity, CI.product_id FROM cart_items AS CI INNER JOIN carts AS C ON C.id = CI.cart_id INNER JOIN product AS P ON CI.product_id = P.id WHERE C.user_id = ?;',
        [userId]
      )
      res.json(cart)
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
