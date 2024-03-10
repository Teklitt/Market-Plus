import React from 'react'
import { Container, Typography, Button, Grid } from '@mui/material'
import '../../css/Global.css'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import CartItem from './CartItem/CartItem'
import { Link } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
  // Function to calculate subtotal
  const calculateSubtotal = () => {
    let subtotal = 0
    cart.forEach((item) => {
      subtotal += item.price * item.quantity // Assuming each item has a 'price' and 'quantity' property
    })
    return subtotal
  }
  const theme = createTheme({})
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to="/" className="link">
        start adding items!
      </Link>
      !
    </Typography>
  )
  const handleEmptyCart = () => onEmptyCart()
  const FilledCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={onUpdateCartQty}
              onRemoveFromCart={onRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div>
        <div
          sx={{
            display: 'flex',
            marginTop: '10%',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h4" sx={{ marginTop: 10 }}>
            {/* Subtotal: {cart.subtotal.formatted_with_symbol} */}
            Subtotal: ${calculateSubtotal()}
          </Typography>
        </div>
        <div>
          <Button
            sx={{
              minWidth: '150px',
              [theme.breakpoints.down('xs')]: {
                marginBottom: '5px',
              },
              [theme.breakpoints.up('xs')]: {
                marginRight: '20px',
              },
              marginBottom: 2,
            }}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            component={Link}
            to="/Checkout"
            sx={{ minWidth: '150px', marginBottom: 2 }}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  )
  if (!cart)
    return (
      <Box sx={{ width: '50%' }}>
        <LinearProgress />
      </Box>
    )
  return (
    <Container>
      <div className="cart-container">
        <Typography sx={{}} variant="h3" gutterBottom>
          Your Shopping Cart
        </Typography>
        {!cart.length ? <EmptyCart /> : <FilledCart />}
      </div>
    </Container>
  )
}

export default Cart
