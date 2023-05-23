import { log } from "console";
import Task from "../models/task.js";

 export const newTask=async(req,res)=>{
    try {
        const {title,desc}=req.body;
    await Task.create({
        title,desc,user:req.user,
    })
    res.status(201).json({
        success:true,
        msg:"Created Task",
    })
        
    } catch (error) {
        console.log(error);
        
    }
    

 };

 export const myTask=async(req,res)=>{
    try {
        console.log("hey");
    const id=req.user._id;
    const datas=await Task.find({user:id});
    res.status(200).json({
        success:true,
        user:datas
    })
        
    } catch (error) {
        console.log(error);
        
    }
    

 }
 export const updateTask=async(req,res)=>{
    try {

        const {id}=req.params;
    const user=await Task.findById(id);
    if(!user){
        return res.status(404).json({
            success:false,
            msg:"User Not Found"
        })
    }
    user.isDone=!user.isDone;
    await user.save();
    res.status(200).json({
        success:true,
    })
        
    } catch (error) {
        console.log(error);
        
    }
    

 }
 export const deleteTask=async(req,res)=>{
    try {
        const {id}=req.params;
    const user=await Task.findById(id);
    if(user){
        await user.deleteOne();
        res.status(200).json({
        success:true,
        msg:"Deleted Task"
    })}
    else{
        res.status(404).json({
            success:false,
            msg:"User Not Found"
        })

    }
        
    } catch (error) {
        console.log(error);
        
    }
    

    
    

 }