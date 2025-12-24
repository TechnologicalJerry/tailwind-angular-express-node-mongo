import { User, type IUser } from '../models/user.model';

export interface CreateUserData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  dob: Date;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  password?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: Date;
}

export const userService = {
  create: async (userData: CreateUserData): Promise<IUser> => {
    try {
      const user = await User.create(userData);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  findAll: async (): Promise<IUser[]> => {
    try {
      return await User.find().select('-password');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  findById: async (id: string): Promise<IUser | null> => {
    try {
      return await User.findById(id).select('-password');
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  findByEmail: async (email: string): Promise<IUser | null> => {
    try {
      return await User.findOne({ email });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  findByUsername: async (userName: string): Promise<IUser | null> => {
    try {
      return await User.findOne({ userName });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
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
