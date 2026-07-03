import mongoose from 'mongoose'

const projectSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true,
        lowercase:true,
        trim:true
    },
    users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})

const projectModel=mongoose.model('project',projectSchema)

export default projectModel