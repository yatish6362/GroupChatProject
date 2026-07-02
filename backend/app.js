import express from "express";
import connectDB from "./db/db.js";
import userRoute from './routes/user.routes.js'
import cookieParser from "cookie-parser";

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser())

app.use('/users',userRoute)

export default app;