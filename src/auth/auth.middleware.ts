import type { UserRole } from '../types/express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';


export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'No autorizado' });
  const token = header.substring(7);
  try {
    const payload = jwt.verify(token, env.jwt.secret) as { id: number; rol: 'tecnico'|'coordinador' };
    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido' });
  }
}
