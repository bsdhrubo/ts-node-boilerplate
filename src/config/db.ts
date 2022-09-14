import mongoose from "mongoose";
import { config } from "./config";

export const connectToDatabase = async ()=>{
    try { 
        await mongoose.connect(config.mongoURI); 

        const db = mongoose.connection;
        
        db.on("error", console.error.bind(console, "MongoDB connection error:"));
    } catch (error) {
        console.log(error)
    }
}