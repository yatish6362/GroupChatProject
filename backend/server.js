import 'dotenv/config.js'
import app from './app.js'
import http from 'http'
import jwt from 'jsonwebtoken'
import { Server } from 'socket.io'
import mongoose from 'mongoose'
import projectModel from './models/project.model.js'
import { log } from 'console'

const PORT=process.env.PORT||4000

const server=http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

io.use(async(socket,next)=>{
    try{
        const token=socket.handshake.auth?.token||socket.handshake.headers.authorization?.split(' ')[1]
        const projectId=socket.handshake.query.projectId
        if(!mongoose.Types.ObjectId.isValid(projectId)){
            return next(new Error('Wrong project id'))
        }

        socket.project=await projectModel.findById(projectId)

        if(!token){
            return next(new Error('Authentication Error'))
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return next(new Error('Authentication Error'))
        }
        socket.user=decoded
        next()

    }
    catch(err){
        next(err)
    }
})

io.on('connection',socket=>{
    socket.roomId=socket.project._id.toString()
    console.log('a user connected');

    socket.join(socket.roomId)

    socket.on('project-message',data=>{

        socket.broadcast.to(socket.roomId).emit('project-message',data)

    })
    socket.on('disconnect',()=>{
        console.log('user disconnected');
        socket.leave(socket.roomsId)
        
    })
    
})


server.listen(PORT,()=>{
    console.log(`Server running on PORT ${PORT}`);
})