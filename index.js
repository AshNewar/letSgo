import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Router from "./routes/user.js";
import Router2 from "./routes/task.js";
// import { Errorhandler } from "./middleWares/error.js";
import cors from "cors";


// config({
//     path:"./models/config.env"
// });




export const app=express();
app.use(bodyParser.urlencoded({urlencoded:true}));
app.use(bodyParser.json());

app.use(express.static("public"));

app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTURL],
    methods:["PUT","GET","POST","DELETE"],
    credentials:true
}));

// app.use(express.json); 

app.use(Router);
app.use(Router2)

// app.use(Errorhandler);



