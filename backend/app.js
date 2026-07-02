import express from "express";
import connectDB from "./db/db.js";
import userRoute from './routes/user.routes.js'

connectDB();
const app = express();

app.use(express.json());

app.use('/users',userRoute)

export default app;