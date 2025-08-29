import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}
