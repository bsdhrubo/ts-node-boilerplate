import mongoose, { Schema } from "mongoose";
import { ITodo } from "./model.interface";

const todoSchema =  new Schema<ITodo>({
    userId: {
        type: Number
    }, 
    id:{
        type: Number,
        unique: true
    }, 
    title:{
        type: String,
        trim: true
    },
    completed:{
        type: Boolean
    }
})

const TodoModel = mongoose.model<ITodo>("todo", todoSchema);
export default TodoModel;