import { User, type IUser } from '../models/user.model.js';

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export const userService = {
  create: async (userData: CreateUserData): Promise<IUser> => {
    const user = new User(userData);
    return await user.save();
  },

  findAll: async (): Promise<IUser[]> => {
    return await User.find().select('-password');
  },

  findById: async (id: string): Promise<IUser | null> => {
    return await User.findById(id).select('-password');
  },

  findByEmail: async (email: string): Promise<IUser | null> => {
    return await User.findOne({ email });
  },

  update: async (id: string, updateData: UpdateUserData): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    ).select('-password');
  },

  delete: async (id: string): Promise<boolean> => {
    const result = await User.findByIdAndDelete(id);
    return result !== null;
  }
};
