import { Request, Response } from 'express';
import { getPool, sql } from '../db';

export async function listar(req: Request, res: Response) {
  const { page = '1', pageSize = '10', estado, codigo } = req.query as any;
  const pool = await getPool();
  const r = await pool.request()
    .input('page', sql.Int, Number(page))
    .input('pageSize', sql.Int, Number(pageSize))
    .input('estado', sql.NVarChar, estado ?? null)
    .input('codigo', sql.NVarChar, codigo ?? null)
    .execute('sp_Expedientes_Listar');
  res.json({ data: r.recordset, total: r.output.total ?? r.recordset.length });
}

export async function obtener(req: Request, res: Response) {
  const id = Number(req.params.id);
  const pool = await getPool();
  const r = await pool.request().input('id', sql.Int, id).execute('sp_Expedientes_Obtener');
  const row = r.recordset[0];
  if (!row) return res.status(404).json({ message: 'No encontrado' });
  res.json(row);
}

export async function crear(req: Request, res: Response) {
  const { codigo, descripcion } = req.body as { codigo: string; descripcion: string };
  const tecnicoId = req.user!.id;
  const pool = await getPool();
  const r = await pool.request()
    .input('codigo', sql.NVarChar, codigo)
    .input('descripcion', sql.NVarChar, descripcion)
    .input('tecnico_id', sql.Int, tecnicoId)
    .execute('sp_Expedientes_Crear');
  res.status(201).json(r.recordset[0]);
}

export async function actualizar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { codigo, descripcion } = req.body as { codigo: string; descripcion: string };
  const tecnicoId = req.user!.id;
  const pool = await getPool();
  const r = await pool.request()
    .input('id', sql.Int, id)
    .input('codigo', sql.NVarChar, codigo)
    .input('descripcion', sql.NVarChar, descripcion)
    .input('tecnico_id', sql.Int, tecnicoId)
    .execute('sp_Expedientes_Actualizar');
  if (r.rowsAffected[0] === 0) return res.status(404).json({ message: 'No encontrado o sin permiso' });
  res.json(r.recordset[0]);
}

export async function cambiarEstado(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { estado, justificacion } = req.body as { estado: 'aprobado'|'rechazado'; justificacion?: string };
  const aprobadorId = req.user!.id;
  const pool = await getPool();
  const r = await pool.request()
    .input('id', sql.Int, id)
    .input('estado', sql.NVarChar, estado)
    .input('justificacion', sql.NVarChar, justificacion ?? null)
    .input('aprobador_id', sql.Int, aprobadorId)
    .execute('sp_Expedientes_CambiarEstado');
  if (r.rowsAffected[0] === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json(r.recordset[0]);
}

export async function activarDesactivar(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { activo } = req.body as { activo: boolean };
  const pool = await getPool();
  const r = await pool.request()
    .input('id', sql.Int, id)
    .input('activo', sql.Bit, activo ? 1 : 0)
    .execute('sp_Expedientes_ActivarDesactivar');
  if (r.rowsAffected[0] === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json({ id, activo });
}
