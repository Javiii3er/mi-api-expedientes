import React from 'react';
import { useAuth } from '../auth/useAuth';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Dashboard</h1>
            <button onClick={logout} className="btn btn-outline-danger">
              Cerrar Sesión
            </button>
          </div>
          
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">¡Bienvenido, {user?.nombre}!</h5>
              <p className="card-text">
                Rol: <strong>{user?.rol}</strong><br/>
                Usuario: <strong>{user?.username}</strong>
              </p>
              
              <h6 className="mt-4">Opciones:</h6>
              <div className="d-grid gap-2 d-md-block">
                <a href="/expedientes" className="btn btn-primary me-2">
                  Ver Expedientes
                </a>
                <a href="/revisar" className="btn btn-success me-2">
                  Revisar Expedientes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;