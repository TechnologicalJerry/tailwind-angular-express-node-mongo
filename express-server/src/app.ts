import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import logging utilities
import { logInfo, logError } from './utils/logger';
import { morganMiddleware, morganErrorMiddleware } from './utils/morgan';

// Import routes
import indexRoutes from './routes/index.routes';


const app = express();

// Logging middleware (must be first)
app.use(morganMiddleware());
app.use(morganErrorMiddleware());

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log application startup
logInfo('🚀 Express server starting...', {
  environment: process.env.NODE_ENV,
  port: process.env.PORT
});

// Routes
app.use('/api', indexRoutes);



// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logError('Application error occurred', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  res.status(500).json({
    message: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message
  });
});

export default app;
