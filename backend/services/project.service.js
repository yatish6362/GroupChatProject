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
