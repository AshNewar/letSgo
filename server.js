import connectDB from "./data/connect.js";
import { app } from "./index.js";

connectDB();
app.listen(4000,()=>{
    console.log(`Started on port ${process.env.PORT} on ${process.env.NODE_URI} mode`);
});