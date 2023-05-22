import Task from "../models/task.js";

 export const newTask=async(req,res)=>{
    const {title,desc}=req.body;
    await Task.create({
        title,desc,user:req.user,
    })
    res.status(201).json({
        success:true,
        msg:"Created Task",
    })

 };

 export const myTask=async(req,res)=>{
    console.log("hey");
    const id=req.user._id;
    const datas=await Task.find({user:id});
    res.status(200).json({
        success:true,
        user:datas
    })

 }
 export const updateTask=async(req,res)=>{
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

 }
 export const deleteTask=async(req,res)=>{
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

    
    

 }