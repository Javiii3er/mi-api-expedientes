import { Request, Response } from 'express';
import { getPool, sql } from '../db';
import bcrypt from 'bcryptjs';
import { signJwt } from '../auth/jwt.utils';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body as { username: string; password: string };
  const pool = await getPool();
  const result = await pool.request()
    .input('username', sql.NVarChar, username)
    .execute('sp_Usuarios_Login');

  const user = result.recordset[0];
  if (!user || !user.activo) return res.status(401).json({ message: 'Credenciales inválidas' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });

  const token = signJwt({ id: user.id, rol: user.rol });
  res.json({ token, user: { id: user.id, nombre: user.nombre, username: user.username, rol: user.rol } });
}
