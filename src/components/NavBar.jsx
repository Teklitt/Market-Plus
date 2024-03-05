import React, { useState, useEffect, useRef } from 'react'
import logo from '../assets/Bear Market logo.png'
import '../css/Navbar.css'
import '../css/Login.css'
import { Badge, IconButton, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import avatar from '../assets/profile avatar.svg'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase-config'
import Login from '../Login'

const LoginForm = ({ closeLoginForm }) => {
  //const [isAuth, setIsAuth] = useState(false)
  const [isAuth, setIsAuth] = useState(
    localStorage.getItem('isAuth') === 'true'
  )

  const modalRef = useRef(null)

  useEffect(() => {
    // Update local storage when isAuth changes
    localStorage.setItem('isAuth', isAuth)
    // Add event listener to close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeLoginForm()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAuth, closeLoginForm])

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.reload(false)
    })
  }

  return (
    <div
      //className="modal"
      style={{
        position: 'fixed',
        top: '58%',
        left: '50%',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0)',
        backgroundColor: 'rgba(0,0,0, 0.4)',
        padding: '20px',

        boxShadow: '0 4px 8px rgba(0, 0, 0, 50)',
        zIndex: '2',
        overflow: 'auto',
      }}
    >
      <div ref={modalRef} className="modal-content animate">
        <div className="imgcontainer">
          <div className="">
            <div className="imgcontainer">
              <img src={avatar} alt="Avatar" className="loginavatar" />
            </div>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault()
                // Handle any additional login logic here if needed
              }}
              className="innerloginbutton"
            >
              Login
            </button>
            <div style={{ marginTop: '50px' }}>
              {!isAuth ? (
                <Login setIsAuth={setIsAuth} />
              ) : (
                <button
                  className="login-with-google-btn new-line-button"
                  onClick={signUserOut}
                >
                  Log out of Bear Market
                </button>
              )}
            </div>

            <div
              className="logincontainer"
              style={{ backgroundColor: '#f1f1f1' }}
            >
              <span className="psw">
                Forgot <a href="#">password?</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const NavBar = ({ totalItems, onCategoryChange }) => {
  const location = useLocation()
  const [showLoginForm, setShowLoginForm] = useState(false)

  const handleLoginClick = () => {
    setShowLoginForm(!showLoginForm)
  }
  const closeLoginForm = () => {
    setShowLoginForm(false)
  }
  const [userName, setUserName] = useState(
    localStorage.getItem('name') || 'User'
  )

  useEffect(() => {
    // Update local storage when name changes
    localStorage.setItem('name', userName)
  }, [userName])

  return (
    <>
      <nav>
        <div className="navbar-container">
          <Link to="Products">
            <img src={logo} className="navbar-logo" alt="logo" />
          </Link>
          <p>
            Deliver to <br></br> 📍 Baltimore 21212
          </p>

          <div className="search-container">
            <button
              type="button"
              className="loginbutton"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
          <p>
            Hello,
            <Typography fontSize="xl" fontWeight="lg" color="orange">
              {userName}
            </Typography>
            <Button
              component={Link}
              to="/Profile"
              variant="outlined"
              color="secondary"
              size="small"
            >
              Account Details
            </Button>
          </p>
          <a href="javascript:void">
            Returns & <br></br>Orders
          </a>

          <p>
            {location.pathname === '/' ||
              (location.pathname === '/Products' && (
                <IconButton
                  component={Link}
                  to="/cart"
                  aria-label="Show cart items"
                  color="inherit"
                >
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              ))}
          </p>
        </div>
        <div className="navbar-categories">
          <a href="/Products">All</a>
          <Link to="/Category1">
            <button
              className="textButton"
              onClick={() => onCategoryChange('student-life')}
            >
              Student Life
            </button>
          </Link>
          <Link to="/Category1">
            <button
              className="textButton"
              onClick={() => onCategoryChange('electronics')}
            >
              Electronics
            </button>
          </Link>
          <Link to="/Category1">
            <button
              className="textButton"
              onClick={() => onCategoryChange('food')}
            >
              Food
            </button>
          </Link>
          <Link to="/Category1">
            <button
              className="textButton"
              onClick={() => onCategoryChange('clothing')}
            >
              Clothing
            </button>
          </Link>
          <Link to="/Category1">
            <button
              className="textButton"
              onClick={() => onCategoryChange('services')}
            >
              Services
            </button>
          </Link>
          <Link to="/Category1">
            <button
              className="textButton"
              onClick={() => onCategoryChange('holiday')}
            >
              Holiday Gifts
            </button>
          </Link>
        </div>
      </nav>
      {/* Conditionally render the login form */}
      {showLoginForm && <LoginForm closeLoginForm={closeLoginForm} />}
    </>
  )
}

export default NavBar
