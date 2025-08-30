import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIndicio, updateIndicio } from '../services/indicios.api'

// Definir el schema
const schema = z.object({
  id: z.number().optional(),
  codigo: z.string().min(1, 'Código requerido'),
  descripcion: z.string().min(1, 'Descripción requerida'),
  peso: z.coerce.number().min(0, 'Peso debe ser >= 0') as z.ZodNumber,
  color: z.string().optional().or(z.literal('')),
  tamano: z.string().optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>


export const IndicioForm = ({ expedienteId, onSaved }: { expedienteId: number; onSaved: () => void }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      codigo: '',
      descripcion: '',
      peso: 0,
      color: '',
      tamano: ''
    }
  })

  const onSubmit: (data: FormValues) => Promise<void> = async (data) => {
    try {
      if (data.id) {
        await updateIndicio(data.id, data)
      } else {
        await createIndicio(expedienteId, data)
      }
      reset({
        codigo: '',
        descripcion: '',
        peso: 0,
        color: '',
        tamano: ''
      })
      onSaved()
    } catch (error) {
      console.error('Error al guardar indicio:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="mb-2">
        <label className="form-label">Código</label>
        <input className={`form-control ${errors.codigo ? 'is-invalid' : ''}`} {...register('codigo')} />
        {errors.codigo && <div className="invalid-feedback">{errors.codigo.message}</div>}
      </div>
      
      <div className="mb-2">
        <label className="form-label">Descripción</label>
        <input className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`} {...register('descripcion')} />
        {errors.descripcion && <div className="invalid-feedback">{errors.descripcion.message}</div>}
      </div>
      
      <div className="mb-2">
        <label className="form-label">Peso</label>
        <input 
          type="number" 
          step="0.01" 
          className={`form-control ${errors.peso ? 'is-invalid' : ''}`} 
          {...register('peso')}
        />
        {errors.peso && <div className="invalid-feedback">{errors.peso.message}</div>}
      </div>
      
      <div className="mb-2">
        <label className="form-label">Color</label>
        <input className="form-control" {...register('color')} />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Tamaño</label>
        <input className="form-control" {...register('tamano')} />
      </div>
      
      <button className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Guardando…' : 'Guardar'}
      </button>
    </form>
  )
}
export default IndicioForm;