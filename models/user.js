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
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});
const User=mongoose.model("abc",userSchema);
export default User;