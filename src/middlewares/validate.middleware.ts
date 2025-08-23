import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema, source: 'body'|'params'|'query' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse((req as any)[source]);
    if (!result.success) return res.status(400).json({ message: 'Validación fallida', errors: result.error.flatten() });
    (req as any)[source] = result.data;
    next();
  };
}
