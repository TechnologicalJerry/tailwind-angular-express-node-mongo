import type { Request, Response } from 'express';
import { userService } from '../services/user.service.js';

export const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.findAll();
      res.json({
        message: 'Users retrieved successfully',
        users: users.map((user: any) => ({
          id: user._id,
          email: user.email,
          name: user.name
        }))
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const user = await userService.findById(id);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'User retrieved successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Get user by ID error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const updateData = req.body;

      const user = await userService.update(id, updateData);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'User updated successfully',
        user: {
          id: user._id,
          email: user.email,
          name: user.name
        }
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteUser: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const deleted = await userService.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
