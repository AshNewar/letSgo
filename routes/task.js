import express  from "express";
import { isAuthenticated } from "../controllers/func.js";
import { deleteTask, myTask, newTask, updateTask } from "../controllers/taskfunc.js";

const router=express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,myTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);



export default router;