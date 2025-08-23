import { Request, Response } from 'express';
import { getPool, sql } from '../db';
import bcrypt from 'bcryptjs';

export async function crearUsuario(req: Request, res: Response) {
  try {
    const { nombre, username, password, rol } = req.body as { 
      nombre: string; 
      username: string; 
      password: string; 
      rol: 'tecnico'|'coordinador' 
    };

    const password_hash = await bcrypt.hash(password, 10);
    const pool = await getPool();

    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('username', sql.NVarChar, username)
      .input('password_hash', sql.NVarChar, password_hash)
      .input('rol', sql.NVarChar, rol)
      .execute('sp_Usuarios_Crear');

    res.status(201).json(result.recordset[0]);
  } catch (error: any) {
    console.error('Error creating user:', error);
    if (error.number === 2627) { // Violación de unique constraint
      return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function listarUsuarios(_req: Request, res: Response) {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query('SELECT id, nombre, username, rol, activo, creado_en FROM Usuarios WHERE activo = 1 ORDER BY id DESC');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
