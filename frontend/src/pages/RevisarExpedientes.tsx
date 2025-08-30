import { useEffect, useState } from 'react'
import { listExpedientes, cambiarEstadoExpediente } from '../services/expedientes.api'
import type { Expediente } from '../types/expediente'

export default function RevisarExpedientes() {
  const [pendientes, setPendientes] = useState<Expediente[]>([])

  const fetchData = async () => {
    const res = await listExpedientes({ page: 1, estado: 'pendiente', pageSize: 50 })
    setPendientes(res.data)
  }

  useEffect(() => { fetchData() }, [])

  const aprobar = async (id: number) => {
    await cambiarEstadoExpediente(id, { estado: 'aprobado', justificacion: 'OK' })
    fetchData()
  }
  const rechazar = async (id: number) => {
    const just = prompt('Justificación de rechazo') || ''
    await cambiarEstadoExpediente(id, { estado: 'rechazado', justificacion: just })
    fetchData()
  }

  return (
    <div>
      <h2>Revisar expedientes</h2>
      <ul className="list-group">
        {pendientes.map(e => (
          <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{e.codigo}</strong> — {e.descripcion}
            </div>
            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-success" onClick={() => aprobar(e.id)}>Aprobar</button>
              <button className="btn btn-sm btn-danger" onClick={() => rechazar(e.id)}>Rechazar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
