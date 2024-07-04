import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const Connect = async () => {
  let DB_URL = process.env.MONGO_URI!;
  await mongoose
    .connect(DB_URL)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database Connection Failed", err));
};
