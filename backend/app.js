import express from "express";
import connectDB from "./db/db.js";
import userRoute from './routes/user.routes.js'
import cookieParser from "cookie-parser";
import cors from 'cors'

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser())
app.use(cors())

app.use('/users',userRoute)

export default app;