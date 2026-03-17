import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import dogRoutes from './api/routes/dog.routes.js';
import shelterRoutes from './api/routes/shelter.routes.js';
import successStoryRoutes from './api/routes/success-story.routes.js';
import { errorHandler } from './api/middlewares/error.handler.js';

// Carga variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares de Seguridad y Utilidad ---
app.use(helmet()); // Seguridad básica de headers
app.use(cors()); // Permitir peticiones desde el frontend (cuando llegue el momento)
app.use(morgan('dev')); // Logging de peticiones
app.use(express.json()); // Parseo de JSON

// --- Rutas ---
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Huellitas API is alive',
    timestamp: new Date().toISOString(),
  });
});

// Registrar rutas de dominios
app.use('/api/dogs', dogRoutes);
app.use('/api/shelters', shelterRoutes);
app.use('/api/success-stories', successStoryRoutes);

// --- Manejo de Errores ---
// Importante: El error handler debe ir después de todas las rutas
app.use(errorHandler);

// --- Arranque ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`🐶 Perritos API: http://localhost:${PORT}/api/dogs`);
  console.log('Ambiente:', process.env.NODE_ENV || 'development');
});
