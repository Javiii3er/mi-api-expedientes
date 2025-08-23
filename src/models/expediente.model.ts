export type EstadoExpediente = 'pendiente' | 'aprobado' | 'rechazado';

export interface Expediente {
  id: number;
  codigo: string;
  descripcion: string;
  estado: EstadoExpediente;
  tecnico_id: number;
  aprobador_id?: number | null;
  fecha_estado?: string | null;
  activo: boolean;
}
