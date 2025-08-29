export type Rol = 'tecnico' | 'coordinador'

export interface User {
  id: number
  rol: Rol
  nombre?: string
}

export interface LoginResponse {
  token: string
  user: User
}
