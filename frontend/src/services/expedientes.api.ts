import { http } from "./http";
import type { Expediente } from "../types/expediente";


export interface ExpedientesResponse {
  data: Expediente[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  estado?: string;
  codigo?: string;
  tecnicoId?: number;
  q?: string;
}

export const expedientesService = {
  async listarExpedientes(params?: PaginationParams): Promise<ExpedientesResponse> {
    return http.get<ExpedientesResponse>("/expedientes", params);
  },

  async obtenerExpediente(id: number): Promise<Expediente> {
    return http.get<Expediente>(`/expedientes/${id}`);
  },

  async crearExpediente(data: { 
    codigo: string; 
    descripcion: string;
  }): Promise<Expediente> {
    return http.post<Expediente>("/expedientes", data);
  },

  async actualizarExpediente(id: number, data: {
    codigo: string;
    descripcion: string;
  }): Promise<Expediente> {
    return http.put<Expediente>(`/expedientes/${id}`, data);
  },

  async cambiarEstado(
    id: number, 
    data: { estado: "aprobado" | "rechazado"; justificacion: string }  
  ): Promise<Expediente> {
    return http.patch<Expediente>(`/expedientes/${id}/estado`, data);
  },

  async activarDesactivarExpediente(
    id: number, 
    activo: boolean
  ): Promise<{ id: number; activo: boolean }> {
    return http.patch<{ id: number; activo: boolean }>(
      `/expedientes/${id}/activo`, 
      { activo }
    );
  },

  async buscarPorCodigo(codigo: string): Promise<Expediente[]> {
    return http.get<Expediente[]>(`/expedientes/buscar?codigo=${codigo}`);
  },

  async obtenerPorTecnico(tecnicoId: number): Promise<Expediente[]> {
    return http.get<Expediente[]>(`/expedientes/tecnico/${tecnicoId}`);
  }
};

export const createExpediente = expedientesService.crearExpediente;
export const getExpediente = expedientesService.obtenerExpediente;
export const updateExpediente = expedientesService.actualizarExpediente;
export const listExpedientes = expedientesService.listarExpedientes;
export const cambiarEstadoExpediente = expedientesService.cambiarEstado;
export const toggleExpediente = expedientesService.activarDesactivarExpediente;
export const buscarExpedientePorCodigo = expedientesService.buscarPorCodigo;
export const getExpedientesPorTecnico = expedientesService.obtenerPorTecnico;
