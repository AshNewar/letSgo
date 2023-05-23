import User from "../models/user.js";
import path from "path";

import bcrypt from "bcrypt";


const loc=path.resolve();
export const isAuthenticated=async(req,res,next)=>{
    try {
        console.log("im here");
        const {token}=req.cookies;
        req.user=await User.findOne({_id:token});
        if(token){
            next();
        }
        else{
            res.sendFile(path.join(loc,"./index.html"));
        }
            
    } catch (error) {
        console.log("error in 1");
        
    }
    

}

export const Userdata=async(req,res)=>{
    try{
        const datas=await User.find({});
        res.status(200).json({
            success:true,
            users:datas
        })

    }catch(err){
        console.log(err);
    }
}
export const Userrequest=(req,res)=>{
    res.sendFile(path.join(loc,"/public/logot.html"));
    console.log(req.cookies);
}


export const UserlogOut=(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_URI==="Development"?"lax":"none",
        secure:process.env.NODE_URI==="Development"?false:true,
    });
    res.redirect("/");
};
export const UserId=async(req,res)=>{
    try {
        const {id}=req.params;
        const user=await User.find({_id:id});
        res.json({
            success:true,
            user,
        })
        
    } catch (error) {
        console.log(error);
        console.log("eror2");
        
    }
    
};

export const UserSignup=async(req,res)=>{
    try {
        const {name,password}=req.body;
    const item=await User.findOne({name});
    console.log(item);
    if(item){
        const isMatch=bcrypt.compare(item.password,password);
        if(isMatch){
            return res.status(404).json({
                success:false,
                message:"User Already Exist",
            })
        //   return res.redirect("/");
        }
    }
    const hashpassword=await bcrypt.hash(password,15);
    console.log(hashpassword);
    const user=await User.create({name:name,password:hashpassword});
    res.status(201).cookie("token",user._id,{
        httpOnly:true,
        expires:new Date(Date.now()+(60*1000)),
        sameSite:process.env.NODE_URI==="Development"?"lax":"none",
        secure:process.env.NODE_URI==="Development"?false:true,
    }).json({
        success:true,
        message:"User Created",
    })
        
    } catch (error) {
        console.log(error);
        
    }
    
}
export const Userlogin=async(req,res)=>{
    try {
        const {name,password}=req.body;
    const item=await User.findOne({name});
    console.log(item);
    if(!item){
        return res.redirect("/signup");
    }
    else{
        const isMatch=await bcrypt.compare(password,item.password);
        console.log(isMatch);
        if(isMatch){
            res.cookie("token",item._id,{
                httpOnly:true,
                expires:new Date(Date.now()+(60*1000)),
                sameSite:process.env.NODE_URI==="Development"?"lax":"none",
                secure:process.env.NODE_URI==="Development"?false:true,
            });
            const loc=path.resolve();
            res.sendFile(path.join(loc,"./public/logot.html"));
        }
        else{
            res.status(404).json({
                success:false,
                msg:"Invalid password",
            })
            // res.redirect("/signup");
        }

        
    }
        
    } catch (error) {
        console.log(error);
        
    }
    
    
    

}