export type EstadoExpediente = 'pendiente' | 'aprobado' | 'rechazado'

export interface Expediente {
  id: number
  codigo: string
  descripcion: string
  estado: EstadoExpediente
  activo: boolean
  creadorId: number
  creadoEn: string
  actualizadoEn?: string
}

export interface ExpedienteQuery {
  pagina?: number
  q?: string
  estado?: EstadoExpediente | ''
  pageSize?: number
}

export interface ExpedienteEstadoDTO {
  estado: 'aprobado' | 'rechazado'
  justificacion: string
}
