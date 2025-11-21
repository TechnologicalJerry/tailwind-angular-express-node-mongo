import app from './app';
import { connectDB } from './config/database';
import { logInfo, logError } from './utils/logger';

const SERVER_PORT = process.env.SERVER_PORT || 9000;

// Connect to database
connectDB();

// Start server
app.listen(SERVER_PORT, () => {
  logInfo(`🚀 Server running on port ${SERVER_PORT}`, {
    port: SERVER_PORT,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logError('Uncaught Exception! Shutting down...', { error: err.message, stack: err.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: any) => {
  logError('Unhandled Rejection! Shutting down...', { error: err.message, stack: err.stack });
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logInfo('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});
