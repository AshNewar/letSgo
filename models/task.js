import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGOURL,{
    dbName:"New"
}).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
});

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
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