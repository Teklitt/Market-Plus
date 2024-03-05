import React from 'react'
import Banner from '../../images/welcome banner.png'
import Banner2 from '../../images/Banner2.png'
import Banner3 from '../../images/Banner3.png'
import Banner4 from '../../images/Banner4.png'
import Banner5 from '../../images/Banner5.png'
import Banner6 from '../../images/Banner6.jpg'
import Banner7 from '../../images/Banner7.jpg'
import Banner8 from '../../images/Banner8.jpg'

const Carousel = () => {
  return (
    <div
      id="carouselExampleInterval"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="3000">
          <img src={Banner} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item" data-bs-interval="3000">
          <img src={Banner2} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item">
          <img src={Banner3} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item">
          <img src={Banner4} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item">
          <img src={Banner5} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item">
          <img src={Banner6} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item">
          <img src={Banner7} class="d-block w-100" alt="..." height={300} />
        </div>
        <div class="carousel-item">
          <img src={Banner8} class="d-block w-100" alt="..." height={300} />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleInterval"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Carousel
