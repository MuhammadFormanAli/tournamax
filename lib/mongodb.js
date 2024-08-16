import mongoose from "mongoose";

export const connectMongoDB = async () => {
try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected To MongoDB');
} catch (error) {
    console.log('Error Connecting To MongoDB:', error)
}
}
