import { useAuth } from '../auth/useAuth'
import './Home.css' // Archivo para estilos personalizados

export default function Home() {
  const { isAuthenticated, user } = useAuth()

  if (isAuthenticated) {
    return (
      <div className="home-container">
        <div className="welcome-card">
          <h1>¡Bienvenido, {user?.nombre}! 👋</h1>
          <p>Has iniciado sesión correctamente en el sistema de gestión de expedientes.</p>
          
          <div className="user-info">
            <p><strong>Usuario:</strong> {user?.username}</p>
            <p>
              <strong>Rol:</strong>{' '}
              <span className="role-badge">{user?.rol}</span>
            </p>
          </div>

          <div className="action-buttons">
            <a href="/expedientes" className="btn-primary">
              📁 Ver Expedientes
            </a>
            {user?.rol === 'coordinador' && (
              <a href="/revisar" className="btn-secondary">
                ✅ Revisar Expedientes
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>🗂️ Sistema de Gestión de Expedientes</h1>
        <p>Gestiona y revisa expedientes e indicios de manera eficiente.</p>
        <a href="/login" className="btn-login">
          🔐 Iniciar Sesión
        </a>
      </div>
    </div>
  )
}
