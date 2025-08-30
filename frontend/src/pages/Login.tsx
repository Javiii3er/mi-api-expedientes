import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../services/auth.api"; 
import { useAuth } from "../auth/useAuth";
import { useState } from "react";
import './Login.css';

const loginSchema = z.object({
  username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await authService.login(data.username, data.password);
      
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      
      login(res.token, res.user);
      
      window.location.href = '/dashboard';
      
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🔐 Sistema de Expedientes</h1>
          <p>Ingresa a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              className={errors.username ? "error" : ""}
              placeholder="Ingresa tu usuario"
              {...register("username")}
            />
            {errors.username && (
              <span className="error-message">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              className={errors.password ? "error" : ""}
              placeholder="Ingresa tu contraseña"
              {...register("password")}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Iniciando sesión...
              </>
            ) : (
              'Ingresar al sistema'
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="demo-credentials">
            <h4>Credenciales de demostración:</h4>
            <div className="credential">
              <strong>👨‍💼 Técnico:</strong> tecnico1 / password123
            </div>
            <div className="credential">
              <strong>👔 Coordinador:</strong> coord1 / password123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;