import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export const AppNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const doLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Expedientes</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link as={NavLink} to="/expedientes">Expedientes</Nav.Link>
                {user?.rol === 'coordinador' && (
                  <Nav.Link as={NavLink} to="/revisar">Revisar/Autorizar</Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            ) : (
              <NavDropdown title={user?.nombre || user?.rol} align="end">
                <NavDropdown.Item onClick={doLogout}>Salir</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
