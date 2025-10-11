import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("Successfully connected mongoDB", conn.connection.host);
  } catch (error) {
    console.error("Failed to connect to mongoDB");
    process.exit(1); // 1 status mean fail, 0 mean success
  }
};
