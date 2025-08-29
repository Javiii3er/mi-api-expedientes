import { useEffect, useMemo, useState } from 'react'
import { listExpedientes, toggleExpediente } from '../services/expedientes.api'
import type { Expediente, EstadoExpediente } from '../types/expediente'
import { SearchBar } from '../components/SearchBar'
import { Table } from '../components/Table'
import { Pagination } from '../components/Pagination'
import { ConfirmDialog } from '../components/ConfirmDialog'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/useAuth'

export default function Expedientes() {
  const [data, setData] = useState<Expediente[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [estado, setEstado] = useState<EstadoExpediente | ''>('')
  const [loading, setLoading] = useState(false)
  const [confirm, setConfirm] = useState<{ id: number, activo: boolean } | null>(null)
  const navigate = useNavigate()
  const { user } = useAuth()

  const pageSize = 10

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await listExpedientes({ pagina: page, q, estado, pageSize })
      setData(res.data)
      setTotal(res.total)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [page, q, estado])

  const columns = useMemo(() => ([
    { key: 'codigo', header: 'Código' },
    { key: 'descripcion', header: 'Descripción' },
    { key: 'estado', header: 'Estado' },
    { key: 'activo', header: 'Activo', render: (r: Expediente) => r.activo ? 'Sí' : 'No' },
    { key: 'acciones', header: 'Acciones', render: (r: Expediente) => (
        <div className="d-flex gap-2">
          <Link className="btn btn-sm btn-outline-primary" to={`/expedientes/${r.id}`}>Ver</Link>
          {user?.id === r.creadorId && (
            <Link className="btn btn-sm btn-outline-secondary" to={`/expedientes/${r.id}/editar`}>Editar</Link>
          )}
          <button className="btn btn-sm btn-outline-danger" onClick={() => setConfirm({ id: r.id, activo: r.activo })}>
            {r.activo ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      ) },
  ]), [user])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Expedientes</h2>
        <div className="d-flex gap-2">
          <select className="form-select" style={{ width: 200 }} value={estado} onChange={e => setEstado(e.target.value as any)}>
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </select>
          <SearchBar value={q} onChange={setQ} placeholder="Buscar por código o estado…" />
          <button className="btn btn-primary" onClick={() => navigate('/expedientes/nuevo')}>Nuevo</button>
        </div>
      </div>

      {loading ? <div>Cargando…</div> : (
        <>
          <Table columns={columns} data={data} />
          <Pagination page={page} pageSize={pageSize} total={total} onChange={setPage} />
        </>
      )}

      <ConfirmDialog
        show={Boolean(confirm)}
        title={confirm?.activo ? 'Desactivar expediente' : 'Activar expediente'}
        message="¿Confirmas la acción?"
        onCancel={() => setConfirm(null)}
        onConfirm={async () => {
          if (!confirm) return
          await toggleExpediente(confirm.id, !confirm.activo)
          setConfirm(null)
          fetchData()
        }}
      />
    </div>
  )
}
