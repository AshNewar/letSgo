import { app } from "./index.js";

app.listen(4000,()=>{
    console.log(`Started on port ${process.env.PORT} on ${process.env.NODE_URI} mode`);
});