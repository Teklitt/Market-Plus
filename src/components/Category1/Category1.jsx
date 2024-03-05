// Category1.js
import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Product from '../Products/Product/Product'
import { commerce } from '../../lib/commerce' // Import your commerce instance

const Category1 = ({ selectedCategory, onAddToCart }) => {
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await commerce.products.list({
          category_slug: [selectedCategory],
        })
        setFilteredProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [selectedCategory])

  //console.log('selectedCategory in Category1:', selectedCategory)
  return (
    <main>
      <Grid container justify="center" spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

export default Category1
