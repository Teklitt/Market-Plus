import React from 'react'
import { CardActions } from '@mui/material'
import '../../.././css/CartItem.css'
import AspectRatio from '@mui/joy/AspectRatio'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardOverflow from '@mui/joy/CardOverflow'
import Chip from '@mui/joy/Chip'
import Link from '@mui/joy/Link'
import Typography from '@mui/joy/Typography'

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
  const handleUpdateCartQty = (lineItemId, newQuantity) =>
    onUpdateCartQty(lineItemId, newQuantity)

  const handleRemoveFromCart = (lineItemId) => onRemoveFromCart(lineItemId)
  return (
    <div className=".container">
      <Card
        sx={{
          width: 320,
          maxWidth: '100%',
          boxShadow: 'lg',
          marginRight: 10,
        }}
      >
        <CardOverflow>
          <AspectRatio sx={{ minWidth: 200 }}>
            <img src={item.image.url} alt={item.name} loading="lazy" />
          </AspectRatio>
        </CardOverflow>

        <CardContent>
          <Typography level="body-xs">{item.description}</Typography>
          <Typography level="title-lg" sx={{ mt: 1, fontWeight: 'xl' }}>
            {item.line_total.formatted_with_symbol}
          </Typography>
        </CardContent>
        <CardActions className="cardActions">
          <div className="buttons">
            <Button
              type="button"
              size="small"
              onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <div className="itemQuantity">
              <Typography sx={{ marginLeft: 2, marginRight: 2 }}>
                {item.quantity}
              </Typography>
            </div>

            <Button
              type="button"
              size="small"
              onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
          <Button
            sx={{ marginLeft: 15 }}
            variant="solid"
            color="danger"
            size="sm"
            onClick={() => handleRemoveFromCart(item.id)}
          >
            Remove
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default CartItem
