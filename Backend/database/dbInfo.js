import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const DBURL = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/renthive";

export const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(DBURL);
        console.log(`database connection establish successfully`);
        return connection;
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
}
