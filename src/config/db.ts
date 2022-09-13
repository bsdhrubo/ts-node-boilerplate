import mongoose from "mongoose";

export const connectToDatabase = async ()=>{
    try {
        const mongoURI = "mongodb://127.0.0.1/boilerplate";
        await mongoose.connect(mongoURI); 

        const db = mongoose.connection;
        db.on("connected", ()=> console.log("MongoDB connected"))
        db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } catch (error) {
        console.log(error)
    }
}