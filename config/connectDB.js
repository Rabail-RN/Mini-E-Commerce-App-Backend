import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
        
    console.log('Database connected successfully');

    return true;

  } catch (err) {
    console.error('Error connecting to database:', err.message);
    process.exit(1);
    return false;
  }
};

export default connectDB;