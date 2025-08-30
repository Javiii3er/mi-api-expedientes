import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60_000, max: 100 }));

// Configuración DIRECTA de Swagger (sin try-catch complejo)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Servidor de Expedientes funcionando' });
});

app.use('/', routes);
app.use(errorHandler);

app.use(cors({
  origin: 'http://localhost:3001', 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


export default app;