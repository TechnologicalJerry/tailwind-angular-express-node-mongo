import morgan from 'morgan';
import { morganStream } from './logger';

// Custom Morgan token for response time
morgan.token('response-time', (req, res) => {
  const responseTime = res.getHeader('X-Response-Time');
  return responseTime ? `${responseTime}ms` : '0ms';
});

// Custom Morgan token for request body (for debugging)
morgan.token('body', (req: any) => {
  if (req.body && Object.keys(req.body).length > 0) {
    return JSON.stringify(req.body);
  }
  return '';
});

// Custom Morgan token for user agent
morgan.token('user-agent', (req: any) => {
  return req.get('User-Agent') || 'Unknown';
});

// Development format
const devFormat = ':method :url :status :response-time :res[content-length] - :user-agent';

// Production format (more detailed)
const prodFormat = ':remote-addr :method :url :status :response-time :res[content-length] :user-agent :body';

// Create Morgan middleware based on environment
export const morganMiddleware = () => {
  const format = process.env.NODE_ENV === 'production' ? prodFormat : devFormat;
  
  return morgan(format, {
    stream: morganStream,
    skip: (req, res) => {
      // Skip logging for health checks in production
      if (process.env.NODE_ENV === 'production' && req.url === '/health') {
        return true;
      }
      return false;
    },
  });
};

// Morgan middleware for error logging
export const morganErrorMiddleware = () => {
  return morgan('combined', {
    stream: morganStream,
    skip: (req, res) => res.statusCode < 400,
  });
};
