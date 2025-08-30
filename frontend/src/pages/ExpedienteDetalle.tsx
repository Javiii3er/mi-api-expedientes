import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getExpediente, cambiarEstadoExpediente } from '../services/expedientes.api'
import { listIndicios, toggleIndicio } from '../services/indicios.api'
import type { Expediente } from '../types/expediente'
import type { Indicio } from '../types/indicio'
import { useAuth } from '../auth/useAuth'
import { IndicioForm } from '../components/IndicioForm'

interface Props { startTab?: 'datos' | 'indicios' | 'historial'; createIndicio?: boolean }

export default function ExpedienteDetalle({ startTab = 'datos', createIndicio }: Props) {
  const { id } = useParams()
  const expedienteId = Number(id)
  const [exp, setExp] = useState<Expediente | null>(null)
  const [indicios, setIndicios] = useState<Indicio[]>([])
  const [tab, setTab] = useState(startTab)
  const { user } = useAuth()
  const [justificacion, setJustificacion] = useState('')
  const [estadoNuevo, setEstadoNuevo] = useState<'aprobado' | 'rechazado'>('aprobado')

  const fetchAll = useCallback(async () => {
    const [e, i] = await Promise.all([
      getExpediente(expedienteId),
      listIndicios(expedienteId),
    ])
    setExp(e)
    setIndicios(i)
  }, [expedienteId]) 

  useEffect(() => { 
    fetchAll() 
  }, [fetchAll])
  useEffect(() => { 
    if (createIndicio) setTab('indicios') 
  }, [createIndicio])

  if (!exp) return <div>Cargando…</div>

  return (
    <div>
      <h2>Expediente #{exp.codigo}</h2>
      <ul className="nav nav-tabs mb-3">
        {['datos','indicios','historial'].map(t => (
          <li className="nav-item" key={t}>
            <button className={`nav-link ${tab===t?'active':''}`} onClick={() => setTab(t as any)}>
              {t === 'datos' ? 'Datos' : t === 'indicios' ? 'Indicios' : 'Historial'}
            </button>
          </li>
        ))}
      </ul>

      {tab === 'datos' && (
        <div className="vstack gap-2">
          <div><strong>Descripción: </strong>{exp.descripcion}</div>
          <div><strong>Estado: </strong>{exp.estado}</div>
          <div><strong>Activo: </strong>{exp.activo ? 'Sí' : 'No'}</div>

          {user?.rol === 'coordinador' && (
            <div className="border rounded p-3 mt-2">
              <h5>Cambiar estado</h5>
              <div className="d-flex gap-2 align-items-center mb-2">
                <select className="form-select" style={{ maxWidth: 180 }} value={estadoNuevo} onChange={e=>setEstadoNuevo(e.target.value as any)}>
                  <option value="aprobado">Aprobado</option>
                  <option value="rechazado">Rechazado</option>
                </select>
                <input className="form-control" placeholder="Justificación" value={justificacion} onChange={e=>setJustificacion(e.target.value)} />
                <button className="btn btn-primary" onClick={async ()=>{
                  await cambiarEstadoExpediente(expedienteId, { estado: estadoNuevo, justificacion })
                  setJustificacion('')
                  fetchAll()
                }}>Guardar</button>
              </div>
            </div>
          )}
        </div>
      )}

      {tab === 'indicios' && (
        <div className="row g-3">
          <div className="col-md-6">
            <h5>Lista de indicios</h5>
            <ul className="list-group">
              {indicios.map(i => (
                <li className="list-group-item d-flex justify-content-between" key={i.id}>
                  <div>
                    <div><strong>{i.descripcion}</strong></div>
                    <small>Peso: {i.peso} — {i.color || 's/ color'} — {i.tamano || 's/ tamaño'}</small>
                  </div>
                  <button className="btn btn-sm btn-outline-danger" onClick={async ()=>{ await toggleIndicio(i.id, !i.activo); fetchAll()}}>
                    {i.activo ? 'Desactivar' : 'Activar'}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h5>Nuevo/Editar indicio</h5>
            <IndicioForm expedienteId={expedienteId} onSaved={fetchAll} />
          </div>
        </div>
      )}

      {tab === 'historial' && (
        <div className="text-muted">(Historial: pendiente de integrar si el backend lo provee)</div>
      )}
    </div>
  )
}

