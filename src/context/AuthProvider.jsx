
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
  const [loading, setLoading] = useState(Boolean(auth))

  const isRegisteringRef = useRef(false)

  useEffect(() => {
    if (!auth) return undefined

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!isRegisteringRef.current) {
        setUser(toUser(firebaseUser))
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const register = useCallback(async ({ name, email, password, photoURL }) => {
    if (!auth) throw notConfiguredError()

    isRegisteringRef.current = true

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      )

      let profileSaved = true

      try {
        await updateProfile(credential.user, {
          displayName: name.trim(),
          photoURL: photoURL?.trim() || null,
        })
      } catch (error) {
        profileSaved = false

        if (import.meta.env.DEV) {
          console.error('Could not save the profile after registering', error)
        }
      }

      return { user: credential.user, profileSaved }
    } finally {
      isRegisteringRef.current = false
      setUser(toUser(auth.currentUser))
    }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    if (!auth) throw notConfiguredError()

    const credential = await signInWithEmailAndPassword(
      auth,
      email.trim(),
      password,
    )

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

  // Gets a fresh Firebase ID token for secure backend requests
  const getIdToken = useCallback(async () => {
    if (!auth?.currentUser) throw notConfiguredError()

    return await auth.currentUser.getIdToken()
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
      getIdToken,
    }),
    [
      user,
      loading,
      register,
      login,
      loginWithGoogle,
      logout,
      updateUserProfile,
      getIdToken,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
