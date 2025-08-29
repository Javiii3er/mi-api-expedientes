import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

type Props = { role: 'tecnico' | 'coordinador' }

export const RoleRoute = ({ role }: Props) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return user.rol === role ? <Outlet /> : <Navigate to="/" replace />
}
    // Si el usuario no tiene el rol requerido, redirigir a la página de inicio 