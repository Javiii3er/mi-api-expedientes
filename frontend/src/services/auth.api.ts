// src/services/auth.api.ts
import { http } from "./http";

export interface User {
  id: number;
  nombre: string;
  username: string;
  rol: "tecnico" | "coordinador";
}

export interface LoginResponse {
  token: string;
  user: User;
}

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await http.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    
    authService.setSession(response);
    return response;
  },

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  setSession(authResult: LoginResponse): void {
    localStorage.setItem("token", authResult.token);
    localStorage.setItem("user", JSON.stringify(authResult.user));
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },

  getUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated(): boolean {
    return authService.getToken() !== null;
  },

  hasRole(role: "tecnico" | "coordinador"): boolean {
    const user = authService.getUser();
    return user?.rol === role;
  },

  // Método adicional útil: Verificar si el token está expirado
  isTokenExpired(): boolean {
    const token = authService.getToken();
    if (!token) return true;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  },

  // Método adicional: Forzar cierre de sesión si el token expiró
  validateSession(): boolean {
    if (authService.isTokenExpired()) {
      authService.logout();
      return false;
    }
    return true;
  }
};