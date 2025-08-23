import 'express';

export type UserRole = 'tecnico' | 'coordinador';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: number; rol: UserRole };
  }
}
