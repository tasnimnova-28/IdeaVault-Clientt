import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import FullPageLoader from '../components/common/FullPageLoader'

// Login and register make no sense for someone who is already signed in.
// They are sent back to where they came from, or to the homepage.
export default function GuestRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageLoader />

  if (user) {
    const from = location.state?.from
    const destination = from ? `${from.pathname}${from.search ?? ''}${from.hash ?? ''}` : '/'
    return <Navigate to={destination} replace />
  }

  return <Outlet />
}
