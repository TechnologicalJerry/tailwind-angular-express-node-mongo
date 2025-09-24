import { Product, type IProduct } from '../models/product.model.js';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stock?: number;
  imageUrl?: string;
}

export const productService = {
  create: async (productData: CreateProductData): Promise<IProduct> => {
    const product = new Product(productData);
    return await product.save();
  },

  findAll: async (): Promise<IProduct[]> => {
    return await Product.find();
  },

  findById: async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
  },

  findByCategory: async (category: string): Promise<IProduct[]> => {
    return await Product.find({ category });
  },

  update: async (id: string, updateData: UpdateProductData): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
  },

  delete: async (id: string): Promise<boolean> => {
    const result = await Product.findByIdAndDelete(id);
    return result !== null;
  },

  updateStock: async (id: string, stock: number): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(
      id, 
      { stock }, 
      { new: true, runValidators: true }
    );
  }
};
