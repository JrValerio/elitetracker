import mongoose from 'mongoose';

const mongoURI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/elitetracker';
export async function setupMongo() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB.');
      return;
    }
    console.log('⏳ Connecting to MongoDB...');
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.log('❌ No connecting to MongoDB', error);
  }
}
