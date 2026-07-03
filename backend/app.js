import express from "express";
import connectDB from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

import userRoute from './routes/user.routes.js'
app.use('/users',userRoute)

import projectRoute from './routes/project.routes.js'
app.use('/projects',projectRoute)

export default app;