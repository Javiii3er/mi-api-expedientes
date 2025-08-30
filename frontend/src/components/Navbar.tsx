import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'
import './Navbar.css'

export const AppNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const doLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar expand="md" className="custom-navbar" variant="dark">
      <Container>

        {/* Branding principal */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          🗂️ Sistema de Expedientes
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="main-nav" />
        
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            {/* Links visibles solo si está autenticado */}
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/expedientes" className="nav-link-custom">
                  📁 Expedientes
                </Nav.Link>
                
                {user?.rol === 'coordinador' && (
                  <Nav.Link as={NavLink} to="/revisar" className="nav-link-custom">
                    ✅ Revisar/Autorizar
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated && (
              <NavDropdown 
                title={
                  <span className="user-dropdown">
                    👤 {user?.nombre || user?.rol}
                  </span>
                } 
                align="end"
                className="nav-dropdown-custom"
              >
                <NavDropdown.ItemText className="user-info">
                  <small>Rol: <strong>{user?.rol}</strong></small>
                </NavDropdown.ItemText>
                <NavDropdown.Divider />

                <NavDropdown.Item onClick={doLogout} className="logout-item">
                  🚪 Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
