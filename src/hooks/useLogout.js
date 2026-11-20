import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useAuth from './useAuth'
import { getAuthErrorMessage } from '../utils/authErrors'

// Shared by the desktop dropdown and the mobile menu
export default function useLogout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return useCallback(async () => {
    // Leave the page first so a private page never bounces the person to /login
    navigate('/', { replace: true })
    try {
      await logout()
      toast.success('You have been logged out.')
    } catch (error) {
      toast.error(getAuthErrorMessage(error))
    }
  }, [logout, navigate])
}
