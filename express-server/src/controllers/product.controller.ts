import type { Request, Response } from 'express';
import { productService } from '../services/product.service.js';

export const productController = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await productService.findAll();
      res.json({
        message: 'Products retrieved successfully',
        products
      });
    } catch (error) {
      console.error('Get all products error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const product = await productService.findById(id);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({
        message: 'Product retrieved successfully',
        product
      });
    } catch (error) {
      console.error('Get product by ID error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
      const productData = req.body;
      const product = await productService.create(productData);

      res.status(201).json({
        message: 'Product created successfully',
        product
      });
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const updateData = req.body;

      const product = await productService.update(id, updateData);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({
        message: 'Product updated successfully',
        product
      });
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const deleted = await productService.delete(id);
      
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
