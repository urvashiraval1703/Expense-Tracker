
//MongoDb connection
import mongoose from "mongoose"
// const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected")
    }
    catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
}
export default connectDB
// module.exports = connectDB;