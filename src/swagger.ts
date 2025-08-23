import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './config/env';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: { 
      title: 'API Expedientes e Indicios', 
      version: '1.0.0',
      description: 'Documentación para la API de Gestión de Expedientes e Indicios',
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Servidor de desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      // ¡AGREGA ESTOS SCHEMAS!
      schemas: {
        Expediente: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            codigo: {
              type: 'string',
              example: 'EXP-2024-001'
            },
            descripcion: {
              type: 'string',
              example: 'Expediente de investigación del caso #123'
            },
            estado: {
              type: 'string',
              enum: ['pendiente', 'aprobado', 'rechazado'],
              example: 'pendiente'
            },
            tecnico_id: {
              type: 'integer',
              example: 1
            },
            tecnico_nombre: {
              type: 'string',
              example: 'Técnico Uno'
            },
            aprobador_id: {
              type: 'integer',
              nullable: true,
              example: null
            },
            justificacion: {
              type: 'string',
              nullable: true,
              example: null
            },
            fecha_estado: {
              type: 'string',
              format: 'date-time',
              nullable: true,
              example: null
            },
            activo: {
              type: 'boolean',
              example: true
            },
            creado_en: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        Indicio: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            expediente_id: {
              type: 'integer',
              example: 1
            },
            codigo: {
              type: 'string',
              example: 'IND-001'
            },
            descripcion: {
              type: 'string',
              example: 'Cuchillo con huellas'
            },
            peso: {
              type: 'number',
              format: 'float',
              example: 2.5
            },
            color: {
              type: 'string',
              nullable: true,
              example: 'Plateado'
            },
            tamano: {
              type: 'string',
              nullable: true,
              example: '15cm'
            },
            activo: {
              type: 'boolean',
              example: true
            },
            creado_en: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            nombre: {
              type: 'string',
              example: 'Técnico Uno'
            },
            username: {
              type: 'string',
              example: 'tecnico1'
            },
            rol: {
              type: 'string',
              enum: ['tecnico', 'coordinador'],
              example: 'tecnico'
            },
            activo: {
              type: 'boolean',
              example: true
            },
            creado_en: {
              type: 'string',
              format: 'date-time',
              example: '2024-01-01T00:00:00.000Z'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Error descriptivo aquí'
            },
            errors: {
              type: 'object',
              properties: {
                fieldIssues: {
                  type: 'array',
                  items: {
                    type: 'string'
                  }
                }
              }
            }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.ts'],
});