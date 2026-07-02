import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";


export const userAuthMiddleware=async(req,res,next)=>{
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    const isBlacklisted=await redisClient.get(token)
    if(isBlacklisted){
        res.cookie('token','')
        return res.status(401).json({
            message:"token blacklisted"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next()
    }catch(err){
        res.status(401).json({
            message:"Unauthorized"
        })
    }

}