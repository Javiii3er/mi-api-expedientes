import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createExpediente, getExpediente, updateExpediente } from '../services/expedientes.api'
import type { Expediente } from '../types/expediente';
import { useNavigate, useParams } from 'react-router-dom'

const schema = z.object({
  codigo: z.string().min(1, 'Código requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
})

type FormValues = z.infer<typeof schema>

export default function ExpedienteForm({ mode }: { mode: 'create' | 'edit' }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({ 
    resolver: zodResolver(schema as any) 
  })

  useEffect(() => {
    if (mode === 'edit' && id) {
      getExpediente(Number(id)).then((exp: Expediente) => 
        reset({ codigo: exp.codigo, descripcion: exp.descripcion })
      )
    }
  }, [mode, id, reset])

  const onSubmit = async (data: FormValues) => {
    try {
      if (mode === 'create') {
        await createExpediente(data)
      } else {
        await updateExpediente(Number(id!), data)
      }
      navigate('/expedientes')
    } catch (error) {
      console.error('Error al guardar expediente:', error)
    }
  }

  return (
    <div className="col-md-6">
      <h2>{mode === 'create' ? 'Nuevo expediente' : 'Editar expediente'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label className="form-label">Código</label>
          <input className={`form-control ${errors.codigo ? 'is-invalid' : ''}`} {...register('codigo')} />
          {errors.codigo && <div className="invalid-feedback">{errors.codigo.message}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} rows={3} {...register('descripcion')} />
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
        </div>
        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando…' : 'Guardar'}
        </button>
      </form>
    </div>
  )
}
