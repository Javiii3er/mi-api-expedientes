import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Expedientes from '../pages/Expedientes'
import ExpedienteDetalle from '../pages/ExpedienteDetalle'
import ExpedienteForm from '../pages/ExpedienteForm'
import RevisarExpedientes from '../pages/RevisarExpedientes'
import Dashboard from '../pages/Dashboard'
import { PrivateRoute } from './PrivateRoute'
import { RoleRoute } from './RoleRoute'

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />

    {/* Rutas protegidas */}
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expedientes" element={<Expedientes />} />
      <Route path="/expedientes/nuevo" element={<ExpedienteForm mode="create" />} />
      <Route path="/expedientes/:id" element={<ExpedienteDetalle />} />
      <Route path="/expedientes/:id/editar" element={<ExpedienteForm mode="edit" />} />
      <Route path="/expedientes/:id/indicios/nuevo" element={<ExpedienteDetalle startTab="indicios" createIndicio />} />

      {/* Rutas solo para coordinadores */}
      <Route element={<RoleRoute role="coordinador" />}>
        <Route path="/revisar" element={<RevisarExpedientes />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)