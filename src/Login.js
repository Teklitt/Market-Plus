import React from 'react'
import { auth, provider } from './firebase-config'
import { signInWithPopup } from 'firebase/auth'
import './css/Login.css'

export default function Login({ setIsAuth }) {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        localStorage.setItem('isAuth', true)
        setIsAuth(true)
        //console.log(result)
        const name = result.user.displayName
        const email = result.user.email
        const profilePic = result.user.photoURL

        localStorage.setItem('name', name)
        localStorage.setItem('email', email)
        localStorage.setItem('profilePic', profilePic)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div>
      <div className="login-container">
        <h1 className="login-header">Sign Up!</h1>
        <p>*Authenticate with your Morgan Email*</p>
        <button className="login-with-google-btn" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
