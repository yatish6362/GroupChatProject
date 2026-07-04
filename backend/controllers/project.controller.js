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

export const getAllProject=async(req,res)=>{
    try{
        const loginUser=await userModel.findOne({email:req.user.email})
        const allUserProject=await projectService.getAllUserProject({userId:loginUser._id})
        
        res.status(200).json({
            projects:allUserProject
        })
    }
    catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

export const addUserToProject=async(req,res)=>{
    const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                errors:error.array()
            })
        }
        try{
            const {users,projectId}=req.body
            const loginUser=await userModel.findOne({email:req.user.email})
            const project=await projectService.addUserToProject({users,projectId,userId:loginUser._id})
            return res.status(200).json({
                project
            })
        }
        catch(err){
            res.status(500).json({
                error:err.message
            })
        }
}

export const getProjectById=async(req,res)=>{
    const {projectId}=req.params

   try{
     const project=await projectService.getProjectById({projectId})
     res.status(200).json({
        project
     })
   }
   catch(err){
    res.status(500).json({
        message:err.message
    })
   }


}