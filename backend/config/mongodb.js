import mongoose from 'mongoose';

const connectDB = async () => {
  // Set up event listeners
  mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected (event listener)');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error (event listener):', err);
  });

  try {
    // Connect without deprecated options
    await mongoose.connect(`${process.env.MONGODB_URI}/SKSTORE`);
    console.log('MongoDB Connected (try/catch)');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  }
};

export default connectDB;
