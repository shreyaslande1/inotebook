const mongoose = require('mongoose');

const mongoURI = 'mongodb://shreyaslande200:vidhishreyasforever@ac-nz0mudt-shard-00-00.uqhbqng.mongodb.net:27017,ac-nz0mudt-shard-00-01.uqhbqng.mongodb.net:27017,ac-nz0mudt-shard-00-02.uqhbqng.mongodb.net:27017/iNotebook?ssl=true&replicaSet=atlas-ibu45q-shard-0&authSource=admin&appName=Cluster0';

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
};

module.exports = connectToMongo;
