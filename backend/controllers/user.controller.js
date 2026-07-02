import * as userService from "../services/user.service.js";
import {validationResult} from 'express-validator'

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

