// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
//import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBGfbuUhRINsAZTrUhDP_e_aGt1Knjy_KI',
  authDomain: 'bear-market-1f0b3.firebaseapp.com',
  projectId: 'bear-market-1f0b3',
  storageBucket: 'bear-market-1f0b3.appspot.com',
  messagingSenderId: '441964630962',
  appId: '1:441964630962:web:b85ab03e49d6116c5d8aab',
  measurementId: 'G-Z57QM0W2T8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()

export const user = auth.currentUser
