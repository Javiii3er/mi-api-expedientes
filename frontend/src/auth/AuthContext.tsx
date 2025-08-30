import { createContext } from "react";

export interface User {
  id: number;
  nombre: string;
  username: string;
  rol: "tecnico" | "coordinador";
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  isAuthenticated?: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});
