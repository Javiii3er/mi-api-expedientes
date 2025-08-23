export interface Indicio {
  id: number;
  expediente_id: number;
  codigo: string;
  descripcion: string;
  peso: number; // >= 0
  color?: string | null;
  tamano?: string | null;
  activo: boolean;
}
