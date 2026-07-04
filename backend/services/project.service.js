import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject=async({name,userId})=>{
    if(!name){
        throw new Error('name is required')
    }
    if(!userId){
        throw new Error('user id is required')
    }

    const project=await projectModel.create({
        name,
        users:[userId]
    })

    return project
}

export const getAllUserProject=async({userId})=>{
    if(!userId){
        throw new Error('user id is required')
    }
    const allUserProject=await projectModel.find({users:userId})

    return allUserProject
}

export const addUserToProject=async({projectId,users,userId})=>{
    if(!projectId){
        throw new Error ('project id is required')
    }
    if(!users){
        throw new Error ('users is required')
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('project id is not mongoose id')
    }
    if(users.some(userId=>!mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('user id is not mongoose id')
    }
     if(!userId){
        throw new Error ('user Id is required')
    }
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error('user id is not mongoose id')
    }
    const project=await projectModel.findOne({
        _id:projectId,
        users:userId
    })

    if(!project){
        throw new Error('user not belong to this project')
    }

    const updatedProject=await projectModel.findOneAndUpdate({
        _id:projectId
    },{
        $addToSet:{
            users:{
                $each:users
            }
        }
    },{
        new:true
    })

    return updatedProject
}
