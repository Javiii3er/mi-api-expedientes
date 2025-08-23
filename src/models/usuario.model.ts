export interface Usuario {
  id: number;
  nombre: string;
  username: string;
  rol: 'tecnico' | 'coordinador';
  activo: boolean;
}
