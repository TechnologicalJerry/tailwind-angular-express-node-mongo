import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    return decoded;
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
};

export const decodeToken = (token: string): { userId: string } | null => {
  try {
    const decoded = jwt.decode(token) as { userId: string };
    return decoded;
  } catch (error) {
    console.error('JWT decode error:', error);
    return null;
  }
};
