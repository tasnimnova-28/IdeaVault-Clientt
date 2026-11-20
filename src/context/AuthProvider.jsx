import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../firebase/firebase.config'
import { AuthContext } from './AuthContext'

// Pages only need a few plain fields, so we keep a simple snapshot instead of the raw Firebase user.
// A new object each time also means React re-renders when the profile changes.
function toUser(firebaseUser) {
  if (!firebaseUser) return null
  return {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName ?? '',
    email: firebaseUser.email ?? '',
    photoURL: firebaseUser.photoURL ?? '',
    emailVerified: firebaseUser.emailVerified,
    providers: firebaseUser.providerData.map((provider) => provider.providerId),
    createdAt: firebaseUser.metadata.creationTime ?? '',
    lastSignInAt: firebaseUser.metadata.lastSignInTime ?? '',
  }
}

// Used when Firebase keys are missing so the UI can show a helpful message instead of crashing
function notConfiguredError() {
  const error = new Error('Firebase is not configured')
  error.code = 'app/not-configured'
  return error
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  // Stays true until Firebase has checked for a saved session, so a refresh never
  // flashes the logged-out UI or bounces a signed-in person off a private page.
  const [loading, setLoading] = useState(Boolean(auth))
  // True while register() is saving the name and photo. Firebase signs the person in as soon as the
  // account exists, but we hold back the new `user` until the profile is saved. Otherwise the
  // register page would redirect too early and the navbar would briefly show an empty name.
  const isRegisteringRef = useRef(false)

  useEffect(() => {
    if (!auth) return undefined

    // Firebase keeps the session in the browser, so this also fires on every page refresh
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!isRegisteringRef.current) setUser(toUser(firebaseUser))
      setLoading(false)
    })
    return unsubscribe
  }, [])

  // Resolves to { user, profileSaved }. The account is created even if saving the name/photo fails,
  // so that case is reported through `profileSaved` instead of being thrown as an error.
  const register = useCallback(async ({ name, email, password, photoURL }) => {
    if (!auth) throw notConfiguredError()
    isRegisteringRef.current = true
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
      let profileSaved = true
      try {
        await updateProfile(credential.user, {
          displayName: name.trim(),
          photoURL: photoURL?.trim() || null,
        })
      } catch (error) {
        profileSaved = false
        if (import.meta.env.DEV) console.error('Could not save the profile after registering', error)
      }
      return { user: credential.user, profileSaved }
    } finally {
      isRegisteringRef.current = false
      // Matches reality whether registration worked (new user) or failed (still signed out)
      setUser(toUser(auth.currentUser))
    }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    if (!auth) throw notConfiguredError()
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password)
    return credential.user
  }, [])

  const loginWithGoogle = useCallback(async () => {
    if (!auth) throw notConfiguredError()
    const credential = await signInWithPopup(auth, googleProvider)
    return credential.user
  }, [])

  const logout = useCallback(async () => {
    if (!auth) return
    await signOut(auth)
  }, [])

  const updateUserProfile = useCallback(async ({ displayName, photoURL }) => {
    if (!auth?.currentUser) throw notConfiguredError()
    await updateProfile(auth.currentUser, {
      displayName: displayName.trim(),
      photoURL: photoURL?.trim() || null,
    })
    setUser(toUser(auth.currentUser))
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      isConfigured: isFirebaseConfigured,
      register,
      login,
      loginWithGoogle,
      logout,
      updateUserProfile,
    }),
    [user, loading, register, login, loginWithGoogle, logout, updateUserProfile],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
