import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

const connectDB=()=>{mongoose.connect(process.env.MONGOURL,{
    dbName:"New"
}).then(()=>{
    console.log("connected to user");
}).catch((err)=>{
    console.log(err);
})
};
export default connectDB;