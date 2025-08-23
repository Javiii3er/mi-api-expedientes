import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface JwtPayload {
  id: number;
  rol: 'tecnico' | 'coordinador';
}

export function signJwt(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwt.secret, { 
    expiresIn: env.jwt.expiresIn 
  } as jwt.SignOptions);
}

export function verifyJwt(token: string): JwtPayload {
  return jwt.verify(token, env.jwt.secret) as JwtPayload;
}