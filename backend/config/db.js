import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Atlas Connected');
  } catch (error) {
    console.error('MongoDB Atlas Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;