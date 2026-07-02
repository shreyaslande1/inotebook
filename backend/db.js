const mongoose = require('mongoose');

const connectToMongo = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }

        await mongoose.connect(mongoURI);

        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); // stop server if DB fails
    }
};

module.exports = connectToMongo;