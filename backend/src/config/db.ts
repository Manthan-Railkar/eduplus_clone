import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduplus_clone';
    console.log(`Connecting to database at: ${connUri.replace(/\/\/.*@/, '//***@')}`); // Hide credentials in log if any
    
    const conn = await mongoose.connect(connUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error instanceof Error ? error.message : error}`);
    process.exit(1);
  }
};
