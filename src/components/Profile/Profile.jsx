import * as React from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Typography from '@mui/joy/Typography'
import Sheet from '@mui/joy/Sheet'

import { useState, useEffect } from 'react'

import avatar from '../../assets/profile avatar.svg'
import { Link } from 'react-router-dom'

export default function UserCard() {
  const [name, setName] = useState(
    localStorage.getItem('name') || 'Default Name'
  )
  const [email, setEmail] = useState(
    localStorage.getItem('email') || 'default@example.com'
  )
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem('profilePic') || avatar
  )
  // State variable to track authentication status

  useEffect(() => {
    // Update local storage when name changes
    localStorage.setItem('name', name)
    localStorage.setItem('email', email)
    localStorage.setItem('profilePic', profilePic)
  }, [name, email, profilePic])

  return (
    <Box
      sx={{
        width: '80%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            content: '"vertical"',
            display: 'block',
            position: 'absolute',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            content: '"horizontal"',
            display: 'block',
            position: 'absolute',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio
          flex
          ratio="1"
          maxHeight={182}
          sx={{ minWidth: 182, borderRadius: 182 }}
        >
          <img src={profilePic} srcSet={profilePic} loading="lazy" alt="" />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {name}
          </Typography>

          {/* <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Seller
          </Typography> */}

          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Products
              </Typography>
              <Typography fontWeight="lg">34</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Sold
              </Typography>
              <Typography fontWeight="lg">52</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Rating
              </Typography>
              <Typography fontWeight="lg">4.9</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <Button
              component={Link}
              to="/Chat"
              variant="outlined"
              color="neutral"
            >
              Messages
            </Button>
            <Button variant="solid" color="primary">
              Selling
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
