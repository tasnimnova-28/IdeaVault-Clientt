import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// All values come from `.env.local` (see `.env.example`). Nothing is hard-coded here.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Values still copied from `.env.example` (they start with "your_") count as missing
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'appId']
export const isFirebaseConfigured = requiredKeys.every((key) => {
  const value = firebaseConfig[key]
  return typeof value === 'string' && value.trim() !== '' && !value.startsWith('your_')
})

// When the keys are missing the app still loads (so the homepage keeps working)
// and the login/register pages explain what to set up.
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null

export const auth = app ? getAuth(app) : null

export const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({ prompt: 'select_account' })
