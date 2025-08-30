import { Container } from 'react-bootstrap'
import { AppRoutes } from './routes/AppRoutes'
import { AppNavbar } from './components/Navbar'
import { AuthProvider } from './auth/AuthProvider'

export function App() {
  return (
    <AuthProvider> 
      <>
        <AppNavbar />
        <Container className="py-3">
          <AppRoutes />
        </Container>
      </>
    </AuthProvider>
  )
}

export default App;