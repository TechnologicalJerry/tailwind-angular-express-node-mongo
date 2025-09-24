import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-app';
    
    console.log('🔄 Connecting to MongoDB...');
    console.log(`📍 Database URI: ${mongoURI}`);
    
    await mongoose.connect(mongoURI);
    
    console.log('✅ MongoDB connected successfully');
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName}`);
    console.log(`🌐 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(() => {
      process.exit(1);
    }, 5000);
  }
};

export { connectDB };
