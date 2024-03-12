//Import necessary modules
const express = require('express')
const router = express.Router()
const connection = require('../lib/mysql')
const util = require('util')

// Endpoint to handle adding items to the cart
router.post('/add-to-cart', async (req, res) => {
  const { productId, quantity, userId } = req.body
  const query = util.promisify(connection.query).bind(connection)
  try {
    const existingCartItem = await query(
      'SELECT * FROM cart_items WHERE product_id = ? AND cart_id = ?',
      [productId, userId]
    )

    //console.log('Existing cart item:', existingCartItem)

    if (existingCartItem.length > 0) {
      console.log('got to the if statement')
      // If the product is already in the cart, update its quantity
      await connection.query(
        `UPDATE cart_items SET quantity = ? WHERE product_id = ? AND cart_id = ?`,
        [existingCartItem[0].quantity + quantity, productId, userId]
      )
    } else {
      // If the product is not in the cart, add it
      await connection.query(
        'INSERT INTO cart_items (product_id, quantity, cart_id, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ',
        [productId, quantity, userId]
      )
    }

    //Fetch and return the updated cart

    const cart = await query(
      'SELECT P.name, P.image, P.price, CI.quantity, CI.product_id FROM cart_items AS CI INNER JOIN carts AS C ON C.id = CI.cart_id INNER JOIN product AS P ON CI.product_id = P.id WHERE C.user_id = ?;',
      [userId]
    )
    console.log(cart)
    res.json(cart)
  } catch (error) {
    console.error('Error adding item to cart:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// // Export the router
module.exports = router
//Assuming you have defined the necessary modules and connection
