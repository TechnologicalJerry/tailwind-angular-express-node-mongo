import mongoose from "mongoose";
import config from "../config";
import logger from "./logger";

async function connect() {
  const dbUri = config.get<string>("dbUri");

  try {
    logger.info(`Connecting to MongoDB...`);
    logger.info(`Database URI: ${dbUri.replace(/\/\/.*@/, '//***:***@')}`);

    await mongoose.connect(dbUri);

    logger.info("Database connected successfully");

    // Log database events
    mongoose.connection.on('connected', () => {
      logger.info('MongoDB connection established');
    });

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Log database stats
    const dbStats = {
      host: mongoose.connection.host,
      port: mongoose.connection.port,
      name: mongoose.connection.name,
      readyState: mongoose.connection.readyState
    };
    logger.info(dbStats, 'Database connection stats');

  } catch (error) {
    logger.error({ error }, "Could not connect to database");
    process.exit(1);
  }
}

export default connect;
