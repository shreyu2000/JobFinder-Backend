const mongoose = require("mongoose");

const connectDB = async () =>{
    try {
       await mongoose.connect(process.env.MONGO_URI);
       console.log("\nMongoDB Connected");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDB;