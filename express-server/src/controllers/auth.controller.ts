import type { Request, Response } from 'express';
import { userService } from '../services/user.service.js';
import { generateToken } from '../utils/jwt.js';
import { hashPassword, comparePassword } from '../utils/hash.js';

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      // Check if user already exists
      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Create user
      const user = await userService.create({
        email,
        password: hashedPassword,
        name
      });

      // Generate token
      const token = generateToken((user._id as any).toString());

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      // Find user
      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken((user._id as any).toString());

      res.json({
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
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
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Get me error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
