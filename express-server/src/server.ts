import dotenv from "dotenv";
dotenv.config();

// Set the config directory to src/config before importing config
process.env.NODE_CONFIG_DIR = __dirname + "/config";

import config from "./config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import app from "./app";
import { startMetricsServer } from "./utils/metrics";

const port = config.get<number>("port");

// Log server startup information
logger.info("Starting Express server...");
logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
logger.info(`Node.js version: ${process.version}`);
logger.info(`Working directory: ${process.cwd()}`);

const server = app.listen(port, async () => {
  logger.info(`Server is running at http://localhost:${port}`);
  logger.info(`Metrics server available at http://localhost:9100`);

  try {
    await connect();
    logger.info("Database connection established");
  } catch (error: any) {
    logger.error({ error }, "Failed to connect to database");
    process.exit(1);
  }

  try {
    startMetricsServer();
    logger.info("Metrics server started successfully");
  } catch (error: any) {
    logger.error({ error }, "Failed to start metrics server");
  }

  logger.info("Server startup completed successfully!");
});

// Enhanced graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}. Starting graceful shutdown...`);
  logger.info("Closing HTTP server...");
  
  server.close((err: any) => {
    if (err) {
      logger.error({ error: err }, "Error during server shutdown");
      process.exit(1);
    }
    
    logger.info("HTTP server closed");
    logger.info("Closing database connection...");
    
    // Close database connection
    import("mongoose").then((mongoose) => {
      mongoose.default.connection.close(false).then(() => {
        logger.info("Database connection closed");
        logger.info("Process terminated gracefully");
        process.exit(0);
      });
    });
  });
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error({ error }, 'Uncaught Exception');
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'Unhandled Rejection');
  process.exit(1);
});

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

export default server;
