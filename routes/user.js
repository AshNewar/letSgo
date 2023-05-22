import express from "express";
import path from "path";
import { UserId,UserSignup,Userdata,UserlogOut,Userlogin,Userrequest,isAuthenticated } from "../controllers/func.js";



const router =express.Router();

router.get("/",isAuthenticated,Userrequest);


//get Area
router.get("/user/all",Userdata);

router.get("/signup",(req,res)=>{
    const loc=path.resolve();
    res.sendFile(path.join(loc,"./public/signup.html"));
});

router.get("/logout",UserlogOut)

//Api Creation  using params/query


router.get("/userId/:id",UserId)


//post Area
router.post("/signup",UserSignup);

router.post("/",Userlogin);

export default router;
