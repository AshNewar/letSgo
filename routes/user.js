import express from "express";
import path from "path";
import { UserId,UserSignup,Userdata,UserlogOut,Userlogin,Userrequest,isAuthenticated } from "../controllers/func.js";



const router =express.Router();

//get Area
router.get("/user/all",Userdata);


router.get("/logout",isAuthenticated,UserlogOut)

//Api Creation  using params/query


router.get("/userId/:id",isAuthenticated,UserId)


//post Area
router.post("/signup",UserSignup);

router.post("/login",Userlogin);

export default router;
