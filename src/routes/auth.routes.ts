import { Router } from 'express';
import { login } from '../controllers/auth.controller';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

const loginSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: tecnico1
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Técnico Uno"
 *                     username:
 *                       type: string
 *                       example: "tecnico1"
 *                     rol:
 *                       type: string
 *                       example: "tecnico"
 *       400:
 *         description: Validación fallida
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', validate(loginSchema), login);

export default router;
