import mongoose from "mongoose";


const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
    },
    isDone:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"abcs",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});
const Task=mongoose.model("task",taskSchema);

export default Task;
