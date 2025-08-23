import { Router } from 'express';
import * as controller from '../controllers/indicio.controller';
import { requireAuth } from '../auth/auth.middleware';
import { requireRole } from '../auth/role.middleware';
import { z } from 'zod';
import { validate } from '../middlewares/validate.middleware';

const router = Router();

const createUpdateSchema = z.object({
  codigo: z.string().min(1),
  descripcion: z.string().min(1),
  peso: z.number().nonnegative(),
  color: z.string().optional(),
  tamano: z.string().optional()
});

const activoSchema = z.object({ activo: z.boolean() });


/**
 * @openapi
 * /indicios/expedientes/{id}/indicios:
 *   get:
 *     summary: Obtener indicios de un expediente
 *     tags: [Indicios]
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
 *         description: Lista de indicios del expediente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Indicio'
 *       404:
 *         description: Expediente no encontrado
 */
router.get('/expedientes/:id/indicios', requireAuth, controller.listarPorExpediente);

/**
 * @openapi
 * /indicios/expedientes/{id}/indicios: 
 *   post:
 *     summary: Agregar indicio a expediente (Solo Técnico dueño)
 *     tags: [Indicios]
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
 *               - peso
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "IND-001"
 *               descripcion:
 *                 type: string
 *                 example: "Cuchillo con huellas"
 *               peso:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 2.5
 *               color:
 *                 type: string
 *                 example: "Plateado"
 *               tamano:
 *                 type: string
 *                 example: "15cm"
 *     responses:
 *       201:
 *         description: Indicio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Indicio'
 *       403:
 *         description: No es el técnico dueño del expediente
 *       404:
 *         description: Expediente no encontrado
 */
router.post('/expedientes/:id/indicios', requireAuth, requireRole('tecnico'), validate(createUpdateSchema), controller.crear);

/**
 * @openapi
 * /indicios/{id}:
 *   put:
 *     summary: Actualizar un indicio (Solo Técnico dueño)
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del indicio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - codigo
 *               - descripcion
 *               - peso
 *             properties:
 *               codigo:
 *                 type: string
 *                 example: "IND-001-A"
 *               descripcion:
 *                 type: string
 *                 example: "Cuchillo con huellas - actualizado"
 *               peso:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 example: 2.8
 *               color:
 *                 type: string
 *                 example: "Plateado oscuro"
 *               tamano:
 *                 type: string
 *                 example: "16cm"
 *     responses:
 *       200:
 *         description: Indicio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Indicio'
 *       403:
 *         description: No es el técnico dueño del indicio
 *       404:
 *         description: Indicio no encontrado
 */
router.put('/indicios/:id', requireAuth, requireRole('tecnico'), validate(createUpdateSchema), controller.actualizar);

/**
 * @openapi
 * /indicios/{id}/activo:
 *   patch:
 *     summary: Activar/Desactivar un indicio
 *     tags: [Indicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del indicio
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
 *         description: Estado del indicio actualizado
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
 *         description: Indicio no encontrado
 */
router.patch('/indicios/:id/activo', requireAuth, validate(activoSchema), controller.activarDesactivar);

export default router;
