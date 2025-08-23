import { Router } from 'express';
import { crearUsuario, listarUsuarios } from '../controllers/usuario.controller';
import { requireAuth } from '../auth/auth.middleware';
import { requireRole } from '../auth/role.middleware';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

const crearUsuarioSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  username: z.string().min(3, 'Username debe tener al menos 3 caracteres'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  rol: z.enum(['tecnico', 'coordinador'], { message: 'Rol debe ser tecnico o coordinador' })
});

/**
 * @openapi
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario (Solo Coordinadores)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - username
 *               - password
 *               - rol
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Nuevo Técnico"
 *               username:
 *                 type: string
 *                 example: "tecnico2"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               rol:
 *                 type: string
 *                 enum: [tecnico, coordinador]
 *                 example: "tecnico"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Validación fallida o usuario ya existe
 *       403:
 *         description: No tiene permisos de coordinador
 */
router.post('/', requireAuth, requireRole('coordinador'), validate(crearUsuarioSchema), crearUsuario);

/**
 * @openapi
 * /usuarios:
 *   get:
 *     summary: Obtener listado de usuarios activos
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', requireAuth, listarUsuarios);

export default router;