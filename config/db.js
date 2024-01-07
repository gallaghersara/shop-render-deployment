import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.set("strictQuery", false);
dotenv.config();
const connectDB = async () => {
  try {
    const MONGO_URI="mongodb+srv://sgalhar:sgalhar987@cluster0.vavxnjb.mongodb.net/test"
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

export default connectDB;