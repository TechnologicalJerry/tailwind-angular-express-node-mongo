import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

interface RequestWithStartTime extends Request {
  startTime?: number;
}

const requestLogger = (req: RequestWithStartTime, res: Response, next: NextFunction) => {
  // Record start time
  req.startTime = Date.now();
  
  // Log incoming request
  logger.info({
    method: req.method,
    url: req.originalUrl,
    userAgent: req.get('User-Agent'),
    ip: req.ip || req.connection.remoteAddress,
    timestamp: new Date().toISOString(),
    headers: {
      'content-type': req.get('Content-Type'),
      'authorization': req.get('Authorization') ? 'Bearer ***' : undefined,
      'x-forwarded-for': req.get('X-Forwarded-For'),
    }
        }, `INCOMING REQUEST: ${req.method} ${req.originalUrl}`);

  // Log request body for non-GET requests (excluding sensitive data)
  if (req.method !== 'GET' && req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    
    // Remove sensitive fields
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
    sensitiveFields.forEach(field => {
      if (sanitizedBody[field]) {
        sanitizedBody[field] = '***';
      }
    });
    
    logger.info(`Request body:`, sanitizedBody);
  }

  // Override res.end to log response
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any) {
    const duration = req.startTime ? Date.now() - req.startTime : 0;
    
    // Log response
    logger.info({
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      contentLength: res.get('Content-Length') || '0',
      timestamp: new Date().toISOString(),
          }, `RESPONSE: ${req.method} ${req.originalUrl} - ${res.statusCode}`);

    // Log response body for errors
    if (res.statusCode >= 400) {
      logger.error({
        statusCode: res.statusCode,
        message: chunk ? chunk.toString() : 'No error message',
        url: req.originalUrl,
        method: req.method
      }, `Error response: ${res.statusCode}`);
    }

    // Call original end method
    return originalEnd.call(this, chunk, encoding);
  };

  next();
};

export default requestLogger;
