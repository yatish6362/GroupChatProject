import * as aiService from '../services/ai.service.js'

export const getResultController=async(req,res)=>{
    const {prompt}=req.query

    try{
        const result=await aiService.generateResult({prompt})

    res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        
    }
}