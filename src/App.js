import './global.css'

import { commerce } from './lib/commerce'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Cart from './components/Cart/Cart'
import Products from './components/Products/Products'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Checkout from './components/CheckoutForm/Checkout/Checkout'
import Profile from './components/Profile/Profile.jsx'
import Carousel from './components/Carousel/Carousel.jsx'
import { Button } from '@mui/material'
import Chat from './components/Chat/Chat.jsx'
import Category1 from './components/Category1/Category1.jsx'

function App() {
  const [products, setProducts] = useState([])

  const [cart, setCart] = useState([])
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }
  //console.log('selectedCategory in App:', selectedCategory)

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/product')
      console.log('API Response:', response)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }
  //console.log(products)

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list()
    //setCategories(data)
  }
  // console.log(categories)

  // const fetchCart = async () => {
  //   setCart(await commerce.cart.retrieve())
  // }

  const userId = '1'
  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/cart?userId=${userId}`
      )
      if (!response.ok) {
        throw new Error('Failed to fetch cart')
      }
      const data = await response.json()
      //console.log('Fetched Cart Data:', data)
      setCart(data) // Assuming setCart is a state setter function
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const handleAddToCart = async (productId, quantity) => {
    try {
      const response = await fetch('http://localhost:3001/api/add-to-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: productId,
          quantity: quantity,
          userId: userId, // Assuming userId is defined elsewhere in your code
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add item to cart')
      }

      // Update the cart with the response data
      const cart = await response.json()
      setCart(cart)

      console.log('Item added to cart successfully')
    } catch (error) {
      console.error('Error adding item to cart:', error)
    }
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/update-cart-quantity',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
            quantity: quantity,
            userId: userId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update cart quantity')
      }

      // Assuming setCart is a state setter function
      // You may need to handle response data based on your API response
      const cart = await response.json()
      setCart(cart)
      console.log('quantity updated successfully')
    } catch (error) {
      console.error('Error updating cart quantity:', error)
    }
  }

  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch(
        'http://localhost:3001/api/remove-item-from-cart',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: productId,
            userId: userId,
          }),
        }
      )
      if (!response.ok) {
        throw new Error('Failed to remove item from cart')
      }
      const data = await response.json()
      setCart(data) // Assuming setCart is a state setter function
      console.log('data log:', data)
      console.log('Item removed from cart successfully')
    } catch (error) {
      console.error('Error removing item from cart:', error)
    }
  }

  const handleEmptyCart = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/empty-cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to empty cart')
      }
      const data = await response.json()
      setCart(data) // Assuming setCart is a state setter functio
      console.log('Items removed from cart successfully')
    } catch (error) {
      console.error('Error removing items from cart:', error)
    }
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()

    setCart(newCart)
  }

  const handleCheckout = async () => {
    console.log('got into handle checkout')
    try {
      const response = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, // Include any necessary data
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to checkout')
      }

      // Handle the successful checkout response
      const data = await response.json()
      console.log('Checkout successful:', data)
      // Optionally, perform any additional actions after successful checkout
    } catch (error) {
      console.error('Error during checkout:', error)
      // Handle the error (e.g., show an error message to the user)
    }
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )

      setOrder(incomingOrder)

      refreshCart()
    } catch (error) {
      setErrorMessage(error.data.error.message)
    }
  }
  //console.log(order)

  useEffect(() => {
    fetchProducts()
    fetchCart()
    fetchCategories()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar
          totalItems={cart?.length ?? 0}
          onCategoryChange={handleCategoryClick}
        />
        <Carousel />
        <header className="App-header">
          <Routes>
            <Route path="/Chat" element={<Chat />} />

            <Route
              path="/Products"
              element={
                <Products products={products} onAddToCart={handleAddToCart} />
              }
            />
            <Route
              path="/Category1"
              element={
                <Category1
                  selectedCategory={selectedCategory}
                  onAddToCart={handleAddToCart}
                />
              }
            />

            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route
              path="/Checkout"
              element={
                <Checkout
                  cart={cart}
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                  onCheckout={handleCheckout}
                  // onCheckout={() => console.log('Mock function called')} // Mock function
                />
              }
            />
            <Route path="/Profile" element={<Profile />} />
          </Routes>

          <Link to="Products">
            <Button>Start Shopping</Button>
          </Link>
        </header>
      </div>
    </BrowserRouter>
  )
}

export default App
