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
            res.status(404).json({
                success:false,
                msg:"Login First",
            });
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
    res.status(202).json({
        success:true,
        msg:"User Logged In",
    })
}


export const UserlogOut=(req,res)=>{
    res.cookie("token",null,{
        httpOnly:true,
        expires:new Date(Date.now()),
        sameSite:process.env.NODE_URI==="Development"?"lax":"none",
        secure:process.env.NODE_URI==="Development"?false:true,
    });
    res.status(202).json({
        success:true,
        msg:"Logged Out Successfully",
    });
};
export const UserId=async(req,res)=>{
    try {
        res.status(200).json({
            success:true,
            user:req.user,
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
};

export const UserSignup=async(req,res)=>{
    console.log("signup");
    try {
        const {name,email,password}=req.body;
        console.log(name,email,password);
    let item=await User.findOne({name:name,email:email});
    console.log(item);
    if(item){
        return res.status(404).json({
            success:false,
            msg:"User Already Exist",
        })
    }
    const hashpassword=await bcrypt.hash(password,15);
    const user=await User.create({name:name,email:email,password:hashpassword});
    res.status(201).cookie("token",user._id,{
        httpOnly:true,
        expires:new Date(Date.now()+(60*1000)),
        sameSite:process.env.NODE_URI==="Development"?"lax":"none",
        secure:process.env.NODE_URI==="Development"?false:true,
    }).json({
        success:true,
        msg:"User Created",
    })
        
    } catch (error) {
        console.log(error);
        
    }
    
}
export const Userlogin=async(req,res)=>{
    try {
        const {email,password}=req.body;
    const item=await User.findOne({email:email,password:password});
    console.log(item);
    if(!item){
        return res.status(404).json({
            success:true,
            msg:"SignUp First",
        });
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
            res.status(202).json({
                success:true,
                msg:"User Logged In"
            });
        }
        else{
            res.status(404).json({
                success:false,
                msg:"Invalid password",
            })
        } 
    }
    } catch (error) {
        console.log(error);
        
    }

}
