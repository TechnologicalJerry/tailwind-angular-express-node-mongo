/**
 * Professional Logging System Examples
 * 
 * This file demonstrates how to use Winston logging throughout your Express application.
 * Copy these patterns into your controllers, services, and middleware.
 */

import { logInfo, logError, logWarn, logDebug } from './logger.js';

// ============================================================================
// CONTROLLER LOGGING EXAMPLES
// ============================================================================

export class LoggingExamples {
  
  // Example 1: Basic logging in a controller method
  static async createUser(req: any, res: any) {
    try {
      const { name, email } = req.body;
      
      // Log the start of the operation
      logInfo('Creating new user', { name, email });
      
      // Simulate user creation
      const user = { id: 1, name, email };
      
      // Log successful completion
      logInfo('User created successfully', { 
        userId: user.id, 
        email: user.email,
        timestamp: new Date().toISOString()
      });
      
      res.json({ user });
    } catch (error: any) {
      // Log errors with context
      logError('Failed to create user', {
        error: error.message,
        stack: error.stack,
        requestBody: req.body,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Example 2: Logging with different levels
  static async processPayment(req: any, res: any) {
    const { amount, currency } = req.body;
    
    // Debug level for detailed information
    logDebug('Processing payment', { amount, currency });
    
    try {
      // Simulate payment processing
      if (amount < 0) {
        logWarn('Invalid payment amount', { amount, currency });
        return res.status(400).json({ message: 'Invalid amount' });
      }
      
      // Info level for successful operations
      logInfo('Payment processed successfully', { 
        amount, 
        currency,
        transactionId: 'txn_123456'
      });
      
      res.json({ message: 'Payment successful' });
    } catch (error: any) {
      logError('Payment processing failed', {
        error: error.message,
        amount,
        currency,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ message: 'Payment failed' });
    }
  }

  // Example 3: Logging database operations
  static async getUserById(req: any, res: any) {
    const { id } = req.params;
    
    logDebug('Fetching user by ID', { userId: id });
    
    try {
      // Simulate database query
      const user = { id, name: 'John Doe', email: 'john@example.com' };
      
      if (!user) {
        logWarn('User not found', { userId: id });
        return res.status(404).json({ message: 'User not found' });
      }
      
      logInfo('User retrieved successfully', { 
        userId: id,
        userEmail: user.email 
      });
      
      res.json({ user });
    } catch (error: any) {
      logError('Database error while fetching user', {
        error: error.message,
        stack: error.stack,
        userId: id,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  // Example 4: Logging authentication events
  static async authenticateUser(req: any, res: any) {
    const { email, password } = req.body;
    
    logInfo('Authentication attempt', { email });
    
    try {
      // Simulate authentication
      const isValid = email === 'admin@example.com' && password === 'password';
      
      if (!isValid) {
        logWarn('Authentication failed', { 
          email,
          reason: 'Invalid credentials',
          ip: req.ip,
          userAgent: req.get('User-Agent')
        });
        
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      logInfo('User authenticated successfully', { 
        email,
        ip: req.ip,
        timestamp: new Date().toISOString()
      });
      
      res.json({ message: 'Authentication successful' });
    } catch (error: any) {
      logError('Authentication error', {
        error: error.message,
        email,
        ip: req.ip,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ message: 'Authentication failed' });
    }
  }

  // Example 5: Logging with structured data
  static async updateUserProfile(req: any, res: any) {
    const { id } = req.params;
    const updates = req.body;
    
    logInfo('Updating user profile', { 
      userId: id, 
      fields: Object.keys(updates),
      timestamp: new Date().toISOString()
    });
    
    try {
      // Simulate update operation
      const updatedUser = { id, ...updates, updatedAt: new Date() };
      
      logInfo('User profile updated successfully', {
        userId: id,
        updatedFields: Object.keys(updates),
        timestamp: new Date().toISOString()
      });
      
      res.json({ user: updatedUser });
    } catch (error: any) {
      logError('Failed to update user profile', {
        error: error.message,
        stack: error.stack,
        userId: id,
        updates,
        timestamp: new Date().toISOString()
      });
      
      res.status(500).json({ message: 'Update failed' });
    }
  }
}

// ============================================================================
// SERVICE LOGGING EXAMPLES
// ============================================================================

export class ServiceLoggingExamples {
  
  // Example: Logging in a service method
  static async sendEmail(to: string, subject: string, body: string) {
    logInfo('Sending email', { to, subject });
    
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 100));
      
      logInfo('Email sent successfully', { 
        to, 
        subject,
        timestamp: new Date().toISOString()
      });
    } catch (error: any) {
      logError('Failed to send email', {
        error: error.message,
        to,
        subject,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }

  // Example: Logging database operations
  static async saveToDatabase(data: any) {
    logDebug('Saving data to database', { dataKeys: Object.keys(data) });
    
    try {
      // Simulate database save
      const savedData = { ...data, id: Math.random(), createdAt: new Date() };
      
      logInfo('Data saved to database successfully', {
        recordId: savedData.id,
        timestamp: new Date().toISOString()
      });
      
      return savedData;
    } catch (error: any) {
      logError('Database save failed', {
        error: error.message,
        stack: error.stack,
        data,
        timestamp: new Date().toISOString()
      });
      throw error;
    }
  }
}

// ============================================================================
// MIDDLEWARE LOGGING EXAMPLES
// ============================================================================

export const loggingMiddleware = (req: any, res: any, next: any) => {
  // Log request start
  logInfo('Request started', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });
  
  // Log response when it finishes
  res.on('finish', () => {
    logInfo('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      responseTime: Date.now() - req.startTime,
      timestamp: new Date().toISOString()
    });
  });
  
  next();
};

// ============================================================================
// USAGE PATTERNS
// ============================================================================

/**
 * LOGGING BEST PRACTICES:
 * 
 * 1. Use appropriate log levels:
 *    - ERROR: System errors, exceptions, failures
 *    - WARN: Potential issues, deprecated usage, recoverable errors
 *    - INFO: Important business events, successful operations
 *    - DEBUG: Detailed information for debugging
 * 
 * 2. Include context in your logs:
 *    - User IDs, request IDs, timestamps
 *    - Relevant business data
 *    - Error details and stack traces
 * 
 * 3. Use structured logging:
 *    - Pass objects as second parameter
 *    - Include consistent fields
 *    - Make logs searchable and filterable
 * 
 * 4. Don't log sensitive information:
 *    - Passwords, tokens, credit card numbers
 *    - Personal identifiable information (PII)
 *    - Internal system details
 * 
 * 5. Use different log levels for different environments:
 *    - Development: DEBUG level for detailed information
 *    - Production: INFO level and above
 *    - Staging: INFO level with more context
 */
