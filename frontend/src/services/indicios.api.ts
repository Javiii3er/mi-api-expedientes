// src/services/indicios.api.ts
import { http } from "./http";

export interface Indicio {
  id: number;
  codigo: string;
  descripcion: string;
  peso: number;
  color?: string;
  tamano?: string;
  activo: boolean;
  expedienteId: number;
  // Campos adicionales que puedas necesitar
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIndicioData {
  codigo: string;
  descripcion: string;
  peso: number;
  color?: string;
  tamano?: string;
}

export interface UpdateIndicioData {
  codigo?: string;
  descripcion?: string;
  peso?: number;
  color?: string;
  tamano?: string;
}

export const indiciosService = {
  // Listar todos los indicios de un expediente
  async listarIndicios(expedienteId: number): Promise<Indicio[]> {
    return http.get<Indicio[]>(`/expedientes/${expedienteId}/indicios`);
  },

  // Obtener un indicio específico por ID
  async obtenerIndicio(id: number): Promise<Indicio> {
    return http.get<Indicio>(`/indicios/${id}`);
  },

  // Crear nuevo indicio en un expediente
  async crearIndicio(
    expedienteId: number, 
    data: CreateIndicioData
  ): Promise<Indicio> {
    return http.post<Indicio>(
      `/expedientes/${expedienteId}/indicios`, 
      data
    );
  },

  // Actualizar indicio completo
  async actualizarIndicio(
    id: number, 
    data: UpdateIndicioData
  ): Promise<Indicio> {
    return http.put<Indicio>(`/indicios/${id}`, data);
  },

  // Actualizar parcialmente un indicio
  async actualizarParcialIndicio(
    id: number, 
    data: Partial<UpdateIndicioData>
  ): Promise<Indicio> {
    return http.patch<Indicio>(`/indicios/${id}`, data);
  },

  // Activar/desactivar indicio
  async activarDesactivarIndicio(
    id: number, 
    activo: boolean
  ): Promise<{ id: number; activo: boolean }> {
    return http.patch<{ id: number; activo: boolean }>(
      `/indicios/${id}/activo`, 
      { activo }
    );
  },

  // Método adicional: Buscar indicios por código
  async buscarPorCodigo(codigo: string): Promise<Indicio[]> {
    return http.get<Indicio[]>(`/indicios/buscar?codigo=${codigo}`);
  },

  // Método adicional: Obtener indicios activos de un expediente
  async listarIndiciosActivos(expedienteId: number): Promise<Indicio[]> {
    return http.get<Indicio[]>(`/expedientes/${expedienteId}/indicios/activos`);
  },

  // Método adicional: Eliminar indicio (si tu API lo permite)
  async eliminarIndicio(id: number): Promise<void> {
    return http.delete<void>(`/indicios/${id}`);
  }
};
