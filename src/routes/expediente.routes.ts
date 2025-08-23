import { Router } from 'express';
import * as controller from '../controllers/expediente.controller';
import { requireAuth } from '../auth/auth.middleware';
import { requireRole } from '../auth/role.middleware';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

const createUpdateSchema = z.object({
  codigo: z.string().min(1),
  descripcion: z.string().min(1)
});

const estadoSchema = z.object({
  estado: z.enum(['aprobado', 'rechazado']),
  justificacion: z.string().optional()
});

const activoSchema = z.object({ activo: z.boolean() });

/**
 * @openapi
 * /expedientes:
 *   get:
 *     summary: Obtener listado de expedientes con paginación
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Tamaño de la página
 *       - in: query
 *         name: estado
 *         schema:
 *           type: string
 *           enum: [pendiente, aprobado, rechazado]
 *         description: Filtrar por estado
 *       - in: query
 *         name: codigo
 *         schema:
 *           type: string
 *         description: Filtrar por código
 *     responses:
 *       200:
 *         description: Lista de expedientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Expediente'
 *                 total:
 *                   type: integer
 *                   example: 5
 */
router.get('/', requireAuth, controller.listar);

/**
 * @openapi
 * /expedientes/{id}:
 *   get:
 *     summary: Obtener un expediente por ID
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     responses:
 *       200:
 *         description: Expediente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expediente'
 *       404:
 *         description: Expediente no encontrado
 */
router.get('/:id', requireAuth, controller.obtener);

/**
 * @openapi
 * /expedientes:
 *   post:
 *     summary: Crear un nuevo expediente (Solo Técnicos)
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "EXP-2024-001"
 *               descripcion:
 *                 type: string
 *                 example: "Expediente de investigación del caso #123"
 *     responses:
 *       201:
 *         description: Expediente creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expediente'
 *       400:
 *         description: Validación fallida
 *       403:
 *         description: No tiene permisos de técnico
 */
router.post('/', requireAuth, requireRole('tecnico'), validate(createUpdateSchema), controller.crear);

/**
 * @openapi
 * /expedientes/{id}:
 *   put:
 *     summary: Actualizar un expediente (Solo Técnico dueño)
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "EXP-2024-001"
 *               descripcion:
 *                 type: string
 *                 example: "Descripción actualizada del expediente"
 *     responses:
 *       200:
 *         description: Expediente actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expediente'
 *       403:
 *         description: No es el técnico dueño del expediente
 *       404:
 *         description: Expediente no encontrado
 */
router.put('/:id', requireAuth, requireRole('tecnico'), validate(createUpdateSchema), controller.actualizar);

/**
 * @openapi
 * /expedientes/{id}/estado:
 *   patch:
 *     summary: Cambiar estado de expediente (Solo Coordinadores)
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - estado
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [aprobado, rechazado]
 *                 example: "aprobado"
 *               justificacion:
 *                 type: string
 *                 example: "Cumple con todos los requisitos"
 *     responses:
 *       200:
 *         description: Estado del expediente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expediente'
 *       403:
 *         description: No tiene permisos de coordinador
 *       404:
 *         description: Expediente no encontrado
 */
router.patch('/:id/estado', requireAuth, requireRole('coordinador'), validate(estadoSchema), controller.cambiarEstado);

/**
 * @openapi
 * /expedientes/{id}/activo:
 *   patch:
 *     summary: Activar/Desactivar un expediente
 *     tags: [Expedientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del expediente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - activo
 *             properties:
 *               activo:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Estado del expediente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 activo:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Expediente no encontrado
 */
router.patch('/:id/activo', requireAuth, validate(activoSchema), controller.activarDesactivar);

export default router;
