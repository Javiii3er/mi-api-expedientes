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
    try {
      const response = await http.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      // Guardar sesión
      authService.setSession(response);
      return response;

    } catch (error: any) {
      // Manejo de errores detallado
      const msg = (error instanceof Error) ? error.message : "Error desconocido";

      // Errores comunes según status code
      if (msg.includes("401")) {
        throw new Error("Credenciales incorrectas");
      } else if (msg.includes("500")) {
        throw new Error("Error del servidor. Intenta más tarde");
      } else if (msg.includes("Failed to fetch")) {
        throw new Error("No se puede conectar al servidor");
      } else {
        throw new Error(msg);
      }
    }
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

  validateSession(): boolean {
    if (authService.isTokenExpired()) {
      authService.logout();
      return false;
    }
    return true;
  }
};

// Funciones reexportadas
export const getCurrentUser = authService.getUser;
export const isAuthenticated = authService.isAuthenticated;
