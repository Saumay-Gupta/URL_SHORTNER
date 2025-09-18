import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/api_handling");
        console.log("DB connected..!!");
    } catch (error) {
        console.log("DataBase Connection Error..!!");
    }
}

export default connectDB;