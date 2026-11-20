import { createContext } from 'react'

// Holds { user, loading, isConfigured, register, login, loginWithGoogle, logout, updateUserProfile }.
// The provider lives in AuthProvider.jsx
export const AuthContext = createContext(null)
