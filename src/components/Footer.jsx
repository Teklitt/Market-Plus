import React from 'react'
import '../css/Footer.css'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-column">
          <p style={{ fontWeight: 'bold' }}>Get to know us</p>
          <p>About Bear Market</p>
          <p>Bear Market Team</p>
        </div>

        <div className="footer-column">
          <p style={{ fontWeight: 'bold' }}>Make Money With Us</p>
          <p>Sell on Bear Market</p>
          <p>Advertise your Product</p>
        </div>

        <div className="footer-column">
          <p style={{ fontWeight: 'bold' }}>Back to top</p>
          <p>📸🎶</p>
        </div>

        <div className="footer-column">
          <p style={{ fontWeight: 'bold' }}>Payment Services</p>
          <p>Bear Card</p>
          <p>Gift Card</p>
        </div>

        <div className="footer-column">
          <p style={{ fontWeight: 'bold' }}>Let Us Help You</p>
          <p>Your Account</p>

          <a
            href="javascript:void(
        window.open(
          'https://form.jotform.com/233367250424149',
          'blank',
          'scrollbars=yes,
          toolbar=no,
          width=700,
          height=500'
        )
      )
    "
          >
            Report Form
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
