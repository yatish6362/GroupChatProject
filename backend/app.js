import express from "express";
import connectDB from "./db/db.js";

connectDB();
const app = express();

app.use(express.json());


export default app;