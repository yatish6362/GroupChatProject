import * as userService from "../services/user.service.js";
import {validationResult} from 'express-validator'
import userModel from "../models/user.model.js";

export const createUserController=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            errors:error.array()
        })
    }
    try{
     const user=await userService.createUser(req.body)
     const token=user.generateJWT()
     res.status(201).json({
        user,
        token
     })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}
export const loginUserController=async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            errors:error.array()
        })
    }
    try{
        const {email,password}=req.body
      const user=await userModel.findOne({email}).select('+password')
      if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
      }
      const isMatch=await user.isValidPassword(password)
      if(!isMatch){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
      }
     const token=user.generateJWT()
     res.status(200).json({
        user,
        token
     })
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }

}

