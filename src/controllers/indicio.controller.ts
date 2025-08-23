import { Request, Response } from 'express';
import { getPool, sql } from '../db';

export async function listarPorExpediente(req: Request, res: Response) {
  const expedienteId = Number(req.params.id);
  const pool = await getPool();
  const r = await pool.request().input('expediente_id', sql.Int, expedienteId).execute('sp_Indicios_ListarPorExpediente');
  res.json(r.recordset);
}

export async function crear(req: Request, res: Response) {
  const expedienteId = Number(req.params.id);
  const { codigo, descripcion, peso, color, tamano } = req.body as any;
  const tecnicoId = req.user!.id;
  const pool = await getPool();
  const r = await pool.request()
    .input('expediente_id', sql.Int, expedienteId)
    .input('codigo', sql.NVarChar, codigo)
    .input('descripcion', sql.NVarChar, descripcion)
    .input('peso', sql.Decimal(10,2), peso)
    .input('color', sql.NVarChar, color ?? null)
    .input('tamano', sql.NVarChar, tamano ?? null)
    .input('tecnico_id', sql.Int, tecnicoId)
    .execute('sp_Indicios_Crear');
  res.status(201).json(r.recordset[0]);
}

export async function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { codigo, descripcion, peso, color, tamano } = req.body as any;
  const tecnicoId = req.user!.id;
  const pool = await getPool();
  const r = await pool.request()
    .input('id', sql.Int, id)
    .input('codigo', sql.NVarChar, codigo)
    .input('descripcion', sql.NVarChar, descripcion)
    .input('peso', sql.Decimal(10,2), peso)
    .input('color', sql.NVarChar, color ?? null)
    .input('tamano', sql.NVarChar, tamano ?? null)
    .input('tecnico_id', sql.Int, tecnicoId)
    .execute('sp_Indicios_Actualizar');
  if (r.rowsAffected[0] === 0) return res.status(404).json({ message: 'No encontrado o sin permiso' });
  res.json(r.recordset[0]);
}

export async function activarDesactivar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { activo } = req.body as { activo: boolean };
  const pool = await getPool();
  const r = await pool.request().input('id', sql.Int, id).input('activo', sql.Bit, activo ? 1 : 0).execute('sp_Indicios_ActivarDesactivar');
  if (r.rowsAffected[0] === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json({ id, activo });
}