import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://codevipul42:vipulMongo%40123@cluster0.x2bdk.mongodb.net/Food-Del', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Error:", error);
        process.exit(1); // Exit process with failure
    }
};