import userModel from "../models/user.model.js";
import projectModel from "../models/project.model.js";
import { validationResult } from "express-validator";
import * as projectService from "../services/project.service.js";

export const createProject=async(req,res)=>{
    const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                errors:error.array()
            })
        }
        const {name}=req.body
        const {email}=req.user
        const loginUser=await userModel.findOne({email})
        const userId=loginUser._id
        try{
            const newProject=await projectService.createProject({name,userId})
            res.status(201).json({
                message:"Project created",
                project:newProject
            })
        }
        catch(err){
            res.status(500).json({
                message:err.message
            })
        }
}