import { NextFunction, Request, Response } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error(' Error:', err);

  const status = err.status ?? 500;
  const message = err.message ?? 'Error interno en el servidor';
  const details = err.details ?? undefined;

  res.status(status).json({ message, details });
}
