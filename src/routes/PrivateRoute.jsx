import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import FullPageLoader from '../components/common/FullPageLoader'

// Wrap private pages in this layout route. Guests are sent to /login and
// returned to the page they wanted once they sign in.
export default function PrivateRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />

  return <Outlet />
}
