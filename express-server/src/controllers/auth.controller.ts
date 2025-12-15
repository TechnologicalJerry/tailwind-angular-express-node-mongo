import type { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { generateToken } from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/hash';
import { logInfo, logError, logWarn, logDebug } from '../utils/logger';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { 
        firstName, 
        lastName, 
        userName, 
        email, 
        password, 
        confirmPassword, 
        phone, 
        gender, 
        dob 
      } = req.body;

      logInfo('User registration attempt', { 
        email, 
        userName, 
        firstName, 
        lastName 
      });

      // Validate required fields
      if (!firstName || !lastName || !userName || !email || !password || !confirmPassword || !phone || !gender || !dob) {
        logWarn('Registration failed: Missing required fields', { 
          providedFields: Object.keys(req.body) 
        });
        return res.status(400).json({ 
          message: 'All fields are required',
          required: ['firstName', 'lastName', 'userName', 'email', 'password', 'confirmPassword', 'phone', 'gender', 'dob']
        });
      }

      // Validate password confirmation
      if (password !== confirmPassword) {
        logWarn('Registration failed: Password confirmation mismatch', { email });
        return res.status(400).json({ message: 'Password and confirm password do not match' });
      }

      // Check if user already exists by email
      const existingUserByEmail = await userService.findByEmail(email);
      if (existingUserByEmail) {
        logWarn('Registration failed: Email already exists', { email });
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Check if username already exists
      const existingUserByUsername = await userService.findByUsername(userName);
      if (existingUserByUsername) {
        logWarn('Registration failed: Username already exists', { userName });
        return res.status(400).json({ message: 'Username already exists' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);
      logDebug('Password hashed successfully');

      // Create user
      const user = await userService.create({
        firstName,
        lastName,
        userName,
        email,
        password: hashedPassword,
        phone,
        gender,
        dob: new Date(dob)
      });

      // Generate token
      const token = generateToken((user._id as any).toString());

      logInfo('User registered successfully', { 
        userId: user._id, 
        email: user.email,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        timestamp: new Date().toISOString()
      });

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob
        },
        token
      });
    } catch (error: any) {
      logError('Registration error', {
        error: error.message,
        stack: error.stack,
        email: req.body?.email,
        userName: req.body?.userName,
        timestamp: new Date().toISOString()
      });
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    console.log('Login request received', req.body);
    try {
      const { email, password } = req.body;

      logInfo('User login attempt', { email });

      // Find user
      const user = await userService.findByEmail(email);
      if (!user) {
        logWarn('Login failed: User not found', { email });
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        logWarn('Login failed: Invalid password', { email });
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken((user._id as any).toString());

      logInfo('User logged in successfully', { 
        userId: user._id, 
        email: user.email,
        timestamp: new Date().toISOString()
      });

      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob
        },
        token
      });
    } catch (error: any) {
      logError('Login error', {
        error: error.message,
        stack: error.stack,
        email: req.body?.email,
        timestamp: new Date().toISOString()
      });
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  logout: async (req: Request, res: Response) => {
    // In a real app, you might want to blacklist the token
    res.json({ message: 'Logout successful' });
  },

  getMe: async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.id;
      const user = await userService.findById(userId);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob
        }
      });
    } catch (error) {
      console.error('Get me error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
